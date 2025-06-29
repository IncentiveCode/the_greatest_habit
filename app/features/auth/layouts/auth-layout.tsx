import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<div className="bg-gradient-to-br from-secondary via-primary/50 to-primary w-dvw h-dvh">
			<Outlet />	
		</div>	
	);
}