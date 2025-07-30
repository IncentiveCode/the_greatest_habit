import { CircleQuestionMarkIcon, GroupIcon } from "lucide-react";
import { Accordion } from "../components/ui/accordion";
import type { Route } from "./+types/faq-page";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
import { getFaqContents } from "../queries";
import { useOutletContext } from "react-router";
import FaqItem from "../components/faq-item";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "The greatest habit" },
	];
};

const searchParams = z.object({
	groupId: z.coerce.number()
});

type FaqPageProps = {
	contents: {
		group_id: number;
    question: string;
    answer: string;
    sort_order: number;
	}[];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { client } = makeSSRClient(request);
	const { success, data } = searchParams.safeParse(params);
	if (! success) {
		return console.log('parse failure');
	}

	const contents = await getFaqContents(client, {
		group_id: data.groupId
	}); 
	return { contents };
}

export default function FaqPage({ loaderData }: { loaderData: FaqPageProps }) {
	const { currentName } = useOutletContext<{
		currentName: string;
	}>();

	return (
		<div>
			<Accordion
				type="single"
				collapsible
				className="w-full"
			>
			{ loaderData.contents.map((content) => (
				<FaqItem
					key={content.sort_order}
					group_id={content.group_id}
					question={content.question}
					answer={content.answer}
					sort_order={content.sort_order}
				/>
			)) }
			</Accordion>
		</div>
	);
}