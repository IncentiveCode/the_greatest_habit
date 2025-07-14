import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Habits | The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function ActionsPage() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
				actions page. <br/><br/>
				action plan 목록이 들어갈 예정입니다.
      </div>
    </main>
  );
}