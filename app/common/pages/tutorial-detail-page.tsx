import type { Route } from "./+types/tutorial-detail-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function TutorialDetailPage() {
	return (
		<div>
			Tutorial detail page
		</div>
	);
}