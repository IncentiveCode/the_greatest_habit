import React, { useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "~/common/components/ui/progress";
import { Card, CardContent } from "~/common/components/ui/card";
import { Checkbox } from "~/common/components/ui/checkbox";
import { Button } from "~/common/components/ui/button";

const habits = [
  {
    title: "오늘 감사한 일을 3가지 적기",
    desc: "긍정적인 감정을 강화하고 스트레스를 완화해, 마음의 안정과 행복감을 높여줍니다.",
    motivation: "감사는 당신이 가진 것을 더 소중하게 만듭니다."
  },
  {
    title: "오늘 하루의 목표 한 가지 정리하기",
    desc: "하루를 무의미하게 흘려보내지 않고, 행동의 방향성을 명확히 잡을 수 있습니다.",
    motivation: "작은 목표 하나가 당신의 하루를 특별하게 만듭니다."
  },
  {
    title: "거울을 보며 자신에게 긍정적인 말 한마디 하기",
    desc: "자기 이미지와 자신감이 개선되고, 뇌가 긍정적인 자아를 강화합니다.",
    motivation: "당신이 스스로를 믿을 때, 세상도 당신을 믿게 됩니다."
  },
];

export default function ChallengeSampleCard() {
  const [completed, setCompleted] = useState(Array(habits.length).fill(false));

  const toggleHabit = (index: number) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
  };

  const progress = (completed.filter(Boolean).length / habits.length) * 100;

  return (
    <div className="p-4 space-y-6">
      <div className="mb-4">
        <h2 className="font-bold text-xl mb-2">챌린지 진행도</h2>
        <Progress value={progress} className="h-3" />
        <p className="text-sm text-gray-600 mt-1">{Math.round(progress)}% 완료</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`rounded-2xl shadow-md transition bg-white ${completed[index] ? "opacity-70" : ""}`}>
              <CardContent className="p-4 flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                    <Checkbox checked={completed[index]} onCheckedChange={() => toggleHabit(index)} />
                    {habit.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{habit.desc}</p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs text-green-600 italic mb-3">“{habit.motivation}”</p>
                  <Button className="w-full" variant={completed[index] ? "secondary" : "default"}>
                    {completed[index] ? "완료됨" : "오늘 실천하기"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
