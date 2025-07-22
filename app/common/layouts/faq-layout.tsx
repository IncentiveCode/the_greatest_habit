import { NavLink, Outlet } from "react-router";
import type { Route } from "./+types/faq-layout";
import Hero from "~/common/components/hero";
import z from "zod";
import { getFaqGroups } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { buttonVariants } from "../components/ui/button";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "FAQ | The greatest habit" },
	];
};

const searchParams = z.object({
	groupId: z.coerce.number()
});

type FaqLayoutProps = {
  groups: {
    description: string | null;
    id: number;
    name: string;
    sort_order: number;
	}[];
	currentId: number;
	currentName: string;
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
	const { client } = makeSSRClient(request);
	const { success, data } = searchParams.safeParse(params);
	if (! success) {
		return console.log('parse failure');
	}

	const groups = await getFaqGroups(client); 
	const currentId = data.groupId;
	const index = groups.findIndex(item => item.id === currentId);
	const currentName = groups[index].name;
	return { groups, currentId, currentName };
};

export default function FaqLayout({ loaderData }: { loaderData: FaqLayoutProps }) {
	return (
		<div className="h-screen">
			<Hero
				title="FAQ"
				description="고객들께서 자주 물어보시는 질문들입니다."
			/>

			<div className="flex flex-wrap justify-center items-center gap-2 mb-10">
			{ loaderData.groups.map((group) => (
				<NavLink 
					className={({ isActive }) => 
						cn(
							buttonVariants({ variant: "outline" }),
							group.id === loaderData.currentId ? "bg-primary" : "")
					}
					to={`/faq/${group.id}`}
				>
					{group.name}
				</NavLink>
			)) }
			</div>

			<div className="px-5 md:px-20 mb-20">
				<Outlet
					context={{
						currentId: loaderData.currentId,
						currentName: loaderData.currentName
					}}
			 	/>
			</div>
		</div>
	);
}