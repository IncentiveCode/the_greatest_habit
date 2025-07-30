import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod";
import z from "zod";
import { adminClient, makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/generate-action-page";
import { getLoggedInUserId, getUserById } from "~/features/users/queries";
import { getHabit } from "../queries";
import { redirect } from "react-router";
import { generateAction } from "~/features/actions/mutations";

const openai = new OpenAI();

const paramSchema = z.object({
	habitId: z.coerce.number(),
});

const actionSchema = z.object({
	title: z.string(),
	description: z.string({
		description: "100자 이내로 이 일일 과제에 대한 설명을 작성해 줘.",
	}),
});

const ResponseSchema = z.object({
	actions: z.array(actionSchema),
});

// get method
export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });

	const { success, error, data } = paramSchema.safeParse(params);	
	if (!success) {
    throw new Response(`Invalid habit id, error : ${error}`, { status: 400 });
  }

	const habit = await getHabit(client, {
		goal_id: data.habitId,
		owner_id: user.profile_id,
	});

	const completion = await openai.chat.completions.parse({
		model: "gpt-4o",
		messages: [
			{
				role: "user",
				content: `나는 현재 습관 만들기를 진행하고 있어. 내가 만들고 있는 습관의 제목은 '${habit.title}'이고, 키워드는 '${habit.keyword}'야. 난이도가 1부터 5까지 있다고 했을 때, 내가 원하는 난이도는 '${habit.difficulty}'야. 오늘 내가 해야할 행동을 하나 정해주고 그에 대한 간략한 설명을 작성해 줘.`,
			},
			{
				role: "user",
				content: "예를 들어, 행동 제목은 '오늘 감사한 일을 3가지 적기' 이고 부연설명은 '긍정적인 감정을 강화하고 스트레스를 완화해, 마음의 안정과 행복감을 높여줍니다.' 야.",
			},
			{
				role: "user",
				content: "나에게 오늘 내가 해야 할 하나의 행동을 만들어줄래?",
			}
		],
		response_format: zodResponseFormat(ResponseSchema, "actions"),
	});

	const actions = completion.choices[0].message.parsed?.actions.map( 
		(action) => (
			{ 
				title: action.title,
				description: action.description,
			}
		)
	);
	if (!actions) {
		return Response.json(
			{ error: "No action generated" },
      { status: 400 }
		);
	}

	// return Response.json(challenges);
	await generateAction(adminClient, {
		goal_id: data.habitId,
		owner_id: user.profile_id,
		difficulty: habit.difficulty
	}, actions);
  return redirect(`/habits/${data.habitId}`);
};