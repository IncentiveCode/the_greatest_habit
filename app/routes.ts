import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
	index("common/pages/home-page.tsx"),
	route("/about", "common/pages/about.tsx"),
	route("/tutorial", "common/pages/tutorial.tsx"),
	route("/plan", "common/pages/plan.tsx"),

	// auth
	route("/join", "features/auth/pages/join.tsx"),
	route("/signin", "features/auth/pages/signin.tsx"),
	route("/signout", "features/auth/pages/signout.tsx"),

	// dashboard
	route("/dashboard", "features/dashboard/pages/dashboard.tsx"),

	// habit & goal
	route("/habits", "features/goal/pages/habits.tsx"),
	route("/goals", "features/goal/pages/goals.tsx"),
	route("/create-habit", "features/goal/pages/create-habit.tsx"),

	// reward
	route("/reward", "features/reward/pages/reward.tsx"),

	// my
	route("/profile", "features/my/pages/profile.tsx"),
	route("/settings", "features/my/pages/settings.tsx"),
] satisfies RouteConfig;
