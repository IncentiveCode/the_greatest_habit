import { redirect } from "react-router";
import type { Route } from "./+types/faq-redirect-page";

export function loader({ params, request }: Route.LoaderArgs) {

	const url = new URL(request.url);
	const groupId = url.searchParams.get("groupId");
	if (!groupId) {
		return redirect("/faq/1");
	} else {
		return redirect(`/faq/${groupId}`);
	}
};