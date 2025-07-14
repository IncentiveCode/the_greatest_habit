import type { Route } from "./+types/challenges-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Challenges | The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function HabitsPage() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
				challenge list page. <br/><br/>
				challenge 목록이 들어갈 예정입니다.
      </div>
    </main>
  );
}