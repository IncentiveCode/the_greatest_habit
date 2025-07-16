import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	// public page
	index("common/pages/home-page.tsx"),
	route("/about", "common/pages/about-page.tsx"),
	...prefix("tutorial", [
		layout("common/layouts/tutorial-layout.tsx", [
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
	...prefix("habits", [
		index("features/goals/pages/habits-page.tsx"),
		route("/:habitId", "features/goals/pages/habit-detail-page.tsx"),
	]),
	...prefix("challenges", [
		index("features/goals/pages/challenges-page.tsx"),
		route("/:challengeId", "features/goals/pages/challenge-detail-page.tsx"),
		route("/generate", "features/goals/pages/generate-challenge-page.tsx"),
	]),
	route("/create-habit", "features/goals/pages/create-habit.tsx"),

	// action-plans
	...prefix("actions", [
		index("features/actions/pages/actions-page.tsx"),
		route("/:planId", "features/actions/pages/action-detail-page.tsx"),
	]),

	// rewards
	route("/rewards", "features/rewards/pages/rewards-page.tsx"),

	// my
	route("/notifications", "features/users/pages/notifications.tsx"),
	route("/profile", "features/users/pages/profile.tsx"),
	route("/settings", "features/users/pages/settings.tsx"),
] satisfies RouteConfig;
