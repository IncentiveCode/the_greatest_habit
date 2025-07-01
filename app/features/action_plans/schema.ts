import { bigint, date, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { goals } from "../goals/schema";

export const period = pgEnum("period", [
	"day", "week", "month",
]);

export const actionPlans = pgTable("action_plans", {
	plan_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
	title: text().notNull(),
	description: text().notNull(),
	period: period().notNull(),
	start_date: date().notNull().defaultNow(),
	end_date: date().notNull().defaultNow(),
	goal_id: bigint({ mode: "number" })
		.references(() => goals.goal_id, {
			onDelete: "cascade",
		})
		.notNull(),
  created_at: timestamp().notNull().defaultNow(),
  completed_at: timestamp(),
});