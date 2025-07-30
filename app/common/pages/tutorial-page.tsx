import { CircleAlertIcon, CircleQuestionMarkIcon } from "lucide-react";
import type { Route } from "./+types/tutorial-page";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function TutorialPage() {
	return (
		<div className="flex flex-col gap-4 items-center justify-center">
			<CircleAlertIcon className="size-12" />
			<h1 className="text-xl text-semibold text-center">
				튜토리얼 메뉴를 준비하고 있습니다. <br/>
				조금만 기다려주세요.
			</h1>
			<Button variant={"outline"}>
				<Link to="/">홈화면으로 돌아가기</Link>
			</Button>
		</div>
	);
}