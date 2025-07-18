import type { Route } from "./+types/challenge-join-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Challenge join | The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function ChallengeJoinPage() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
				Challenge detail page. <br/><br/>
				챌린지 가입 정보가 들어갈 예정입니다.
      </div>
    </main>
  );
}