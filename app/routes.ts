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
	...prefix("faq", [
		layout("common/layouts/faq-layout.tsx", [
			index("common/pages/faq-redirect-page.tsx"),
			route("/:groupId", "common/pages/faq-page.tsx"),
		]),
	]),

	// auth
	...prefix("auth", [
		layout("features/auth/layouts/auth-layout.tsx", [
			route("/join", "features/auth/pages/join-page.tsx"),
			route("/sign-in", "features/auth/pages/sign-in-page.tsx"),
		]),
		route("/sign-out", "features/auth/pages/sign-out-page.tsx"),
	]),

	
	// habit & goal
	...prefix("habits", [
		index("features/goals/pages/habits-page.tsx"),
		route("/:habitId", "features/goals/pages/habit-detail-page.tsx"),
		route("/:habitId/generate", "features/goals/pages/generate-action-page.tsx"),
	]),
	...prefix("challenges", [
		index("features/goals/pages/challenges-page.tsx"),
		...prefix("/:challengeId", [
			index("features/goals/pages/challenge-detail-page.tsx"),
			route("/join", "features/goals/pages/challenge-join-page.tsx"),
		]),
		route("/generate", "features/goals/pages/generate-challenge-page.tsx"),
	]),
	route("/create-habit", "features/goals/pages/create-habit-page.tsx"),
	route("/create-challenge", "features/goals/pages/create-challenge-page.tsx"),
	
	// action-plans
	...prefix("actions", [
		index("features/actions/pages/actions-page.tsx"),
		route("/:planId", "features/actions/pages/action-detail-page.tsx"),
	]),
	
	// rewards
	route("/rewards", "features/rewards/pages/rewards-page.tsx"),
	
	// my info 
	...prefix("user", [
		index("features/users/pages/my-profile-page.tsx"),
		route("/notifications", "features/users/pages/notifications-page.tsx"),
		route("/dashboard", "features/users/pages/dashboard-page.tsx"),
		route("/settings", "features/users/pages/settings-page.tsx"),
	]),

	// users (타인의 정보 확인, 이메일 트랜잭션 등)
	...prefix("users/:username", [
		index("features/users/pages/profile-page.tsx"),
		route("/welcome/:email", "features/users/pages/welcome-page.tsx"),
	]),
] satisfies RouteConfig;
