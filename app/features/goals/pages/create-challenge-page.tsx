import type { MetaFunction } from "react-router";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New | The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

const STEP_QUESTIONS = [
  {
    question: "어떤 챌린지를 만들고 싶으신가요?",
    options: ["학업", "운동", "독서", "생활 습관"],
    hasInput: true,
  },
  {
    question: "챌린지 기간을 선택해주세요.",
    options: ["3일", "7일", "21일", "66일"],
    hasInput: false,
  },
  {
    question: "챌린지에 참여하는 다른 사용자들에게 매일 다른 일일 미션을 드리려고 합니다. 일일 미션의 난이도를 선택해주세요.",
    options: ["1", "2", "3", "4"],
    hasInput: false,
    extraOption: "일일 미션을 받지 않음",
  },
  {
    question: "챌린지를 완료한 사용자들에게 제공되는 리워드를 선택해주세요.",
    hasSlider: true,
  },
];

export default function CreateChallengePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sliderValue, setSliderValue] = useState(5);

  const current = STEP_QUESTIONS[step];

  const handleOptionClick = (option: string) => {
    setAnswers([...answers, option]);
    setInputValue("");
    setStep(step + 1);
  };

  const handleNext = () => {
    setAnswers([...answers, inputValue]);
    setInputValue("");
    setStep(step + 1);
  };

  const handleSliderNext = () => {
    setAnswers([...answers, sliderValue]);
    setStep(step + 1);
  };

  if (step >= STEP_QUESTIONS.length) {
    // 최종 결과 화면 (예시)
    return (
      <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
          <h2 className="text-xl font-bold">챌린지 생성이 완료되었습니다!</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(answers, null, 2)}</pre>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <h2 className="text-lg font-semibold mb-4">{current.question}</h2>
        {/* 버튼 선택형 질문 */}
        {current.options && (
          <div className="flex flex-wrap gap-4 mb-4">
            {current.options.map((option) => (
              <button
                key={option}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {/* 기타 입력 */}
        {current.hasInput && (
          <div className="flex gap-2">
            <input
              type="text"
              className="border rounded px-2 py-1"
              placeholder="기타 (직접 입력)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="px-4 py-1 bg-green-500 text-white rounded"
              onClick={handleNext}
              disabled={!inputValue.trim()}
            >
              다음
            </button>
          </div>
        )}
        {/* 추가 옵션(일일 미션을 받지 않음) */}
        {current.extraOption && (
          <button
            className="mt-4 px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => handleOptionClick(current.extraOption!)}
          >
            {current.extraOption}
          </button>
        )}
        {/* 슬라이더 */}
        {current.hasSlider && (
          <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            <input
              type="range"
              min={1}
              max={10}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center">리워드: <span className="font-bold">{sliderValue}</span></div>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleSliderNext}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </main>
  );
}