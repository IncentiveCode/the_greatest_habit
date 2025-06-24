import { Link } from "react-router";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { BarChart3Icon, BellIcon, CircleCheckIcon, CircleHelpIcon, CircleIcon, LogOutIcon, MessageCircleIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const public_menus = [
	{
		name: "About",
		description: "The greatest habit 에 대해서 알아봅니다.",
		to: "/about",
	},
	{
		name: "How to use",
		description: "The greatest habit 의 사용법에 대해서 알아봅니다.",
		to: "/tutorial"
	},
	{
		name: "Plan",
		description: "가격 정책에 대해서 알아봅니다.",
		to: "/plan",
	},
	{
		name: "Blog",
		description: "blog 로 이동합니다.",
		to: "https://cloudylab.blogspot.kr",
	},
];

const menus = [
	{
		name: "Action",
		description: "습관/목표를 관리합니다.",
		to: "/habits",
		items: [
			{
				name: "습관 관리",	
				description: "당신의 삶을 바꾸고 있는 습관 보기",
				to: "/habits",	
			},
			{
				name: "습관 만들기",
				description: "삶을 바꾸는 작은 습관 만들기",
				to: "create-habit",
			},
			{
				name: "목표 관리",
				description: "목표 달성을 위해 오늘 해야 할 일",
				to: "/goals",
			},
			{
				name: "목표 만들기",
				description: "새로운 목표를 작성합니다.",
				to: "create-goal",
			}
		]
	},
	{
		name: "Reward",
		description: "당신을 움직이게 만들 정적/부정적 동기부여",
		to: "reward",
	}
];


export default function Navigation({
	isSignIn,
	onSignInChange,
	hasNotification,
}: {
	isSignIn: boolean,
	onSignInChange: (checked: boolean) => void,
	hasNotification: boolean,
}) {
	return (
		<nav className="flex px-20 h-16 items-center justify-between backdrop-blur-50 fixed top-0 left-0 right-0 z-50 bg-background/50">
			<NavigationMenu>
				<Link to={isSignIn ? "/dashboard" : "/"} className="font-bold tracking-tighter text-lg">The greatest habit</Link>
				<Separator orientation="vertical" className="!h-6 mx-4 bg-primary" />
				<NavigationMenuList>
				{isSignIn ? <>
					{menus.map((menu) => (
					<NavigationMenuItem>
						{menu.items ? <>
						<NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
								{menu.items?.map((item) => (
									<NavigationMenuLink asChild>
										<Link to={item.to}>
											<div className="text-sm leading-none font-medium">{item.name}</div>
											<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
												{item.description}
											</p>
										</Link>
									</NavigationMenuLink>
								))}
								</ul>
							</NavigationMenuContent>
						</> : <>
							<NavigationMenuItem>
								<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
									<Link to={menu.to}>{menu.name}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</>
					}
					</NavigationMenuItem>
				))}
				</> : <>
					{public_menus.map((menu) => (
						<NavigationMenuItem>
							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
								<Link to={menu.to}>{menu.name}</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</>
				}
				</NavigationMenuList>
			</NavigationMenu>
			<div className="flex items-center gap-4">
				<Label htmlFor="sign-in-mode">Sign out</Label>
				<Switch id="sign-in-mode" 
					checked={isSignIn}
					onCheckedChange={onSignInChange}
				 />
				<Label htmlFor="sign-in-mode">Sign in</Label>
				{isSignIn ?
					<div className="flex items-center gap-2">
						<Button size="icon" variant="ghost" asChild className="relative">
							<Link to="/my/notifications">
								<BellIcon className="size-4" />
								{hasNotification && (
									<span className="absolute top-1.5 right-1.5 size-2 bg-red-500 text-white rounded-full" />
								)}
							</Link>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Avatar>
									<AvatarImage src="https://github.com/incentivecode.png" />
									<AvatarFallback>N</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel className="flex flex-col">
									<span className="font-medium">incentivecode</span>
									<span className="text-xs text-muted-foreground">@username</span>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link to="/my/dashboard">
											<BarChart3Icon className="w-4 h-4 mr-2" />
											Dashboard
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link to="/my/profile">
											<UserIcon className="w-4 h-4 mr-2" />
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link to="/my/settings">
											<SettingsIcon className="w-4 h-4 mr-2" />
											Settings
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link to="/auth/signout">
											<LogOutIcon className="w-4 h-4 mr-2" />
											Sign-out
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div> 
					: 
					<div className="flex items-center gap-4">
						<Button asChild variant="outline">
							<Link to="/auth/signin">Sign In</Link>
						</Button>
						<Button>
							<Link to="/auth/join">Join</Link>
						</Button>
					</div>
				}
			</div>
		</nav>
	);
}