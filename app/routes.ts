import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	// public page
	index("common/pages/home-page.tsx"),
	route("/about", "common/pages/about-page.tsx"),
	layout("common/layouts/tutorial-layout.tsx", [
		...prefix("tutorial", [
			index("common/pages/tutorial-page.tsx"),
			route("/:tutorialId", "common/pages/tutorial-detail-page.tsx"),
		])
	]),
	route("/plan", "common/pages/plan-page.tsx"),

	// auth
	...prefix("auth", [
		layout("features/auth/layouts/auth-layout.tsx", [
			route("/join", "features/auth/pages/join-page.tsx"),
			route("/sign-in", "features/auth/pages/sign-in-page.tsx"),
		]),
		route("/sign-out", "features/auth/pages/sign-out-page.tsx"),
	]),
		
	// dashboard
	route("/dashboard", "features/dashboard/pages/dashboard.tsx"),

	// habit & goal
	route("/habits", "features/goals/pages/habits.tsx"),
	route("/goals", "features/goals/pages/goals.tsx"),
	route("/create-habit", "features/goals/pages/create-habit.tsx"),

	// reward
	route("/reward", "features/reward/pages/reward.tsx"),

	// my
	route("/notifications", "features/my/pages/notifications.tsx"),
	route("/profile", "features/my/pages/profile.tsx"),
	route("/settings", "features/my/pages/settings.tsx"),
] satisfies RouteConfig;
