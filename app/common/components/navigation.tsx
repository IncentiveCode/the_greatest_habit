import { Link } from "react-router";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { BellIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "~/lib/utils";


const public_menus = [
	{
		name: "About",
		description: "The greatest habit 에 대해서 알아봅니다.",
		to: "/#about",
	},
	{
		name: "How to use",
		description: "The greatest habit 의 사용법에 대해서 알아봅니다.",
		to: "/#tutorial"
	},
	{
		name: "Plan",
		description: "가격 정책에 대해서 알아봅니다.",
		to: "/#plan",
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
				description: "당신의 삶을 바꾸는 습관",
				to: "/habits",	
			},
			{
				name: "챌린지",
				description: "함께 성장하는 쉬운 방법",
				to: "/challenges",
			},
			{
				name: "새로운 도전",
				description: "새로운 도전을 시작합니다.",
				to: "/create-habit",
			}
		]
	},
	{
		name: "Rewards",
		description: "당신을 움직이게 만들 정적/부정적 동기부여",
		to: "/rewards",
	},
	{
		name: "How to use",
		description: "",
		to: "/tutorial"
	},
];


function signInNavMenu() {
	return (
		<div className="flex items-center gap-4">
		{menus.map((menu) => (
			<NavigationMenuItem 
				key={menu.name}
			>
			{menu.items ? (
				<div>
					<Link to={menu.to}>
						<NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
					</Link>
					<NavigationMenuContent>
						<ul className="grid grid-cols-2 w-[500px] gap-4 font-light">
						{menu.items?.map((item) => (
							<NavigationMenuItem
								key={item.name}
								className={cn([
									"select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
									item.to === "/create-habit" &&
										"col-span-2 bg-primary/5 hover:bg-primary/10 focus:bg-primary/10",
								])}
							>
								<NavigationMenuLink>
									<Link 
										className="block leading-none no-underline outline-none"
										to={item.to}
									>
										<span className="leading-none font-medium">{item.name}</span>
										<p className="text-muted-foreground line-clamp-2 text-xs leading-snug pt-2">
											{item.description}
										</p>
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
						</ul>
					</NavigationMenuContent>
				</div>
			) : (
				<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
					<Link to={menu.to}>{menu.name}</Link>
				</NavigationMenuLink>
			)}
			</NavigationMenuItem>
		))}
		</div>
	);
}

function signOutNavMenu() {
	return (
		<div className="flex items-center gap-4">
		{public_menus.map((menu) => (
			<NavigationMenuItem key={menu.name}>
				<Link 
					className={navigationMenuTriggerStyle()}
					to={menu.to}
				>
					{menu.name}
				</Link>
			</NavigationMenuItem>
		))}
		</div>
	);
}


export default function Navigation({
	isSignIn,
	hasNotification,
	email,
	avatar,
	username,
}: {
	isSignIn: boolean;
	hasNotification: boolean;
	email: string;
	avatar: string | null;
	username: string;
}) {
	return (
		<nav className="flex px-20 h-16 items-center justify-between backdrop-blur-50 fixed top-0 left-0 right-0 z-50 bg-background/50">
			<div className="flex items-center gap-4">
				<Link to={isSignIn ? "/dashboard" : "/#home"} className="font-bold tracking-tighter text-lg">The greatest habit</Link>
				<Separator orientation="vertical" className="!h-6 mx-4 bg-primary" />
				<NavigationMenu>
					<NavigationMenuList>
					{isSignIn ? signInNavMenu() : signOutNavMenu()}
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			<div>
				{isSignIn ?
					<div className="flex items-center gap-2">
						<Button size="icon" variant="ghost" asChild className="relative">
							<Link to="/notifications">
								<BellIcon className="size-4" />
								{hasNotification && (
									<span className="absolute top-1.5 right-1.5 size-2 bg-red-500 text-white rounded-full" />
								)}
							</Link>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Avatar>
								{avatar ? (
									<AvatarImage src={avatar} />
								) : (
									<AvatarFallback>{username?.[0]}</AvatarFallback>
								)}
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel className="flex flex-col">
									<span className="text-sm font-medium">{username}</span>
									<span className="text-xs text-muted-foreground">{email}</span>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link to="/profile">
											<UserIcon className="w-4 h-4 mr-2" />
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link to="/settings">
											<SettingsIcon className="w-4 h-4 mr-2" />
											Settings
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link to="/auth/sign-out">
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
							<Link to="/auth/sign-in">Sign In</Link>
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