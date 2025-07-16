import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod";
import z from "zod";
import { insertChallenges } from "../mutations";
import { adminClient } from "~/supa-client";
import type { Route } from "./+types/generate-challenge-page";

const openai = new OpenAI();

const ChallengeSchema = z.object({
	title: z.string(),
	description: z.string({
		description: "100자 이내로 챌린지에 대한 설명을 작성해 줘.",
	}),
});

const ResponseSchema = z.object({
	challenge: z.object({ ChallengeSchema }),
});

const TempSchema = z.object({ 
	challenges: z.array(ChallengeSchema)
});

// get method
export const loader = async () => {

	// 404 로 리턴.
  return new Response(null, { status: 404 });
	
	/*
	const completion = await openai.chat.completions.parse({
		model: "gpt-4o",
		messages: [
			{
				role: "user",
				content: "21일 동안 하루 5분씩 투자해서 좋은 습관 만들기 챌린지를 할거야. 챌린지 제목과 이 챌린지가 왜 좋은 습관이 될 수 있는지 짧은 부연설명을 작성해 줘.",
			},
			{
				role: "user",
				content: "예를 들어, 챌린지 제목은 '오늘 감사한 일을 3가지 적기' 이고 부연설명은 '긍정적인 감정을 강화하고 스트레스를 완화해, 마음의 안정과 행복감을 높여줍니다.' 야.",
			},
			{
				role: "user",
				content: "나에게 3개의 챌린지 정보를 만들어 줄래?",
			}
		],
		response_format: zodResponseFormat(TempSchema, "challenges"),
	});

	const challenges = completion.choices[0].message.parsed?.challenges.map(
		(challenge) => (
			{ 
				title: challenge.title,
				description: challenge.description,
			}
		)
	);
	if (!challenges) {
		return Response.json(
			{ error: "No challenges generated" },
      { status: 400 }
		);
	}

	// return Response.json(challenges);
	await insertChallenges(adminClient, challenges);
	return Response.json({
		ok: true
	})
	 */
};

// cron 작업시 필요 : post method 사용해야 함.
export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  const header = request.headers.get("X-Incentive");
  if (!header || header !== "X-Code") {
    return new Response(null, { status: 404 });
  }

	const completion = await openai.chat.completions.parse({
		model: "gpt-4o",
		messages: [
			{
				role: "user",
				content: "21일 동안 하루 5분씩 투자해서 좋은 습관 만들기 챌린지를 할거야. 챌린지 제목과 이 챌린지가 왜 좋은 습관이 될 수 있는지 짧은 부연설명을 작성해 줘.",
			},
			{
				role: "user",
				content: "예를 들어, 챌린지 제목은 '오늘 감사한 일을 3가지 적기' 이고 부연설명은 '긍정적인 감정을 강화하고 스트레스를 완화해, 마음의 안정과 행복감을 높여줍니다.' 야.",
			},
			{
				role: "user",
				content: "나에게 3개의 챌린지 정보를 만들어 줄래?",
			}
		],
		response_format: zodResponseFormat(TempSchema, "challenges"),
	});

	const challenges = completion.choices[0].message.parsed?.challenges.map(
		(challenge) => (
			{ 
				title: challenge.title,
				description: challenge.description,
			}
		)
	);
	if (!challenges) {
		return Response.json(
			{ error: "No challenges generated" },
      { status: 400 }
		);
	}

	// return Response.json(challenges);

	await insertChallenges(adminClient, challenges);
	return Response.json({
		ok: true
	})
};