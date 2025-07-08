import { MessageCircleQuestionIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "~/common/components/ui/sidebar";

interface MessageCardProps {
	id: string;
  name: string;
}

export function TutorialItemCard({
	id,
  name,
}: MessageCardProps) {
	const location = useLocation();

  return (
		<SidebarMenuItem>
			<SidebarMenuButton 
				className="h-18" 
				asChild
				isActive={location.pathname === `/tutorial/${id}`}
			>
				<Link to={`/tutorial/${id}`}>
					<div className="flex items-center gap-2">
						<MessageCircleQuestionIcon className="size-4" />
						<span className="text-sm font-medium">{name}</span>
					</div>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
  );
} 