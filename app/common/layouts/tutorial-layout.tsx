import { Outlet } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarProvider } from "~/common/components/ui/sidebar";
import { TutorialItemCard } from "../components/tutorial-item-card";
import type { Route } from "./+types/tutorial-layout";

export const meta: Route.MetaFunction = () => {
	return [
		{ title: "Tutorials | The greatest habit" },
	];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	// 	
};

export default function MessagesLayout() {
	return (
		<SidebarProvider className="max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] overflow-hidden min-h-full">
			<Sidebar>
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
						{Array.from({ length: 20 }).map((_, index) => (
							<TutorialItemCard key={index}
								id={index.toString()}
								name={`tutorial ${index}`}
							/>	
						))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<div className="w-full h-full">
				<Outlet />
			</div>
		</SidebarProvider>
	);
}