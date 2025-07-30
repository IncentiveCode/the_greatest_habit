import { Form, redirect } from "react-router";
import { useState } from "react";
import Hero from "~/common/components/hero";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import z from "zod";
import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/create-habit-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserById } from "~/features/users/queries";
import { createHabit } from "~/features/goals/mutations";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "습관 만들기 | The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

const STEP_QUESTIONS = [
  {
    question: "만들고 싶은 습관의 이름을 정해주세요.",
    options: [],
    hasInput: true,
  },
  {
    question: "어떤 습관을 만들고 싶으신가요?",
    options: ["학업", "운동", "독서", "생활 습관"],
    hasInput: false,
  },
  {
    question: "일일 미션의 난이도를 선택해주세요.",
    options: ["1", "2", "3", "4", "5"],
    hasInput: false,
  },
];

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  keyword: z.string(),
  difficulty: z.coerce.number(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const formData = await request.formData();
  const { data, success, error } = formSchema.safeParse(
    Object.fromEntries(formData) 
  );
  if (! success) return { formErrors: error.flatten().fieldErrors };
  console.log(data);

  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });

  console.log(user.profile_id);
  const habitId = await createHabit(client, {
    owner_id: user.profile_id,
    title: data.title,
    description: data.description,
    keyword: data.keyword,
    difficulty: data.difficulty,
  });

  // return redirect(`/habits/${habitId}`);
  return redirect(`/habits/${habitId}/generate`);
};

export default function CreateHabitPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const current = STEP_QUESTIONS[step];

  const handleOptionClick = (option: string) => {
    setAnswers([...answers, option]);
    setTitle("");
    setDescription("");
    setStep(step + 1);
  };

  const handleNext = () => {
    setAnswers([...answers, title, description]);
    setTitle("");
    setDescription("");
    setStep(step + 1);
  };

  const clearStep = () => {
    setAnswers([]);
    setTitle("");
    setDescription("");
    setStep(0);
  };

  if (step >= STEP_QUESTIONS.length) {
    return (
      <div className="min-h-screen px-5 md:px-20">
        <Hero
          title="새로운 습관 형성에 도전하기"
        />

        <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
          <h2 className="text-xl font-bold">입력이 완료되었습니다!</h2>
        </div>

        <Form method="post" className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <InputPair 
              label="습관의 이름"
              id="title"
              name="title"
              value={answers[0]}
              readOnly
            />
            <InputPair
              label="간단 설명"
              id="description"
              name="description"
              value={answers[1]}
              readOnly
              textArea
            />
            <InputPair
              label="습관 종류"
              id="keyword"
              name="keyword"
              value={answers[2]}
              readOnly
            />
            <InputPair
              label="난이도"
              id="difficulty"
              name="difficulty"
              value={answers[3]}
              readOnly
            />
          </div>

          <div className="flex gap-5 justify-center">
            <Button
              type="submit"
            >
              작성한 내용대로 습관 생성
            </Button>

            <Button
              variant={"secondary"}
              onClick={()=>clearStep()}
            >
              처음부터 다시하기
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 md:px-20">
			<Hero
				title="새로운 습관 형성에 도전하기"
			/>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col justify-start items-center gap-8 min-h-0 w-full md:w-2/3">
          <h2 className="text-lg md:text-2xl font-semibold mb-4">Q. {current.question}</h2>
          {current.hasInput && (
          <div className="flex flex-col gap-2 w-full">
            <InputPair
              label="습관의 이름을 작성해주세요."
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            /> 
            <InputPair
              label="습관에 대해 간단하게 설명해주세요."
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={80}
              required
              textArea
            /> 
            <div>&nbsp;</div>
            <Button
              className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded"
              onClick={handleNext}
              disabled={!title.trim() || !description.trim()}
            >
              다음
            </Button>
          </div>
          )}
          <div className="flex flex-col gap-4 mb-4 w-full">
            {current.options.map((option) => (
              <button
                key={option}
                className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}