import { getAboutContents } from "../queries";
import { AboutCard } from "../components/about-card";
import type { Route } from "./+types/about-page";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs ) => {
	const { client, headers } = makeSSRClient(request);
	const contents = await getAboutContents(client);
	return { contents };
}

export default function AboutPage({loaderData}: Route.ComponentProps) {
	return (
		<div className="flex flex-col justify-center gap-10">
			<h1 className="text-2xl font-bold">The greatest habit</h1>	

			<div className="flex flex-col gap-10 justify-center items-center w-full">
			{loaderData.contents.map((content) => (
				<AboutCard title={content.title} content={content.description} />
			))}
			</div>
		</div>
	);
}