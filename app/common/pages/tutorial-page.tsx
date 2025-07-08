import { CircleQuestionMarkIcon } from "lucide-react";
import type { Route } from "./+types/tutorial-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function TutorialPage() {
	return (
		<div className="h-full w-full flex flex-col gap-4 items-center justify-center">
			<CircleQuestionMarkIcon className="size-12 text-muted-foreground" />
			<h1 className="text-xl text-muted-foreground font-semibold">
				Click on a message in the sidebar to view it.
			</h1>
		</div>
	);
}