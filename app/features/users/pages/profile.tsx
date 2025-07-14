import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function ProfilePage() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
				profile page. <br/><br/>
				사용자 정보 변경을 위한 폼이 들어갈 예정입니다.
      </div>
    </main>
  );
}