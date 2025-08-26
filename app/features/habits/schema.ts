import { bigint, boolean, integer, pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { goal_period, goal_status, message_frequency } from "../goals/schema";
import { authenticatedRole, authUid } from "drizzle-orm/supabase";
import { sql } from "drizzle-orm";

export const habits = pgTable(
	"habits", {
		habit_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		owner_id: uuid()
			.references(() => profiles.profile_id, {
				onDelete: "cascade",
			})
			.notNull(),
		title: text().notNull(),
		description: text(),
		created_at: timestamp().notNull().defaultNow(),
		updated_at: timestamp().notNull().defaultNow(),
		message_frequency: message_frequency().notNull().default("once a day"),
		goal_status: goal_status().notNull().default("Started"),
		goal_period: goal_period().notNull().default("3 days"),
		difficulty: integer().notNull().default(1),
		keyword: text().notNull().default("생활 습관"),
	},
	(table) => [
		pgPolicy("habits-insert-policy", {
			for: "insert",
			to: authenticatedRole,
			as: "permissive",
			withCheck: sql`${authUid} = ${table.owner_id}`,
		}),
		pgPolicy("habits-update-policy", {
			for: "update",
			to: authenticatedRole,
			as: "permissive",
			using: sql`${authUid} = ${table.owner_id}`,
			withCheck: sql`${authUid} = ${table.owner_id}`,
		}),
		pgPolicy("habits-select-policy", {
			for: "select",
			to: authenticatedRole,
			as: "permissive",
			using: sql`${authUid} = ${table.owner_id}`,
		}),
	]
);

export const habitDailyGoals = pgTable(
	"habit_daily_goals", {
		goal_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		habit_id: bigint({ mode: "number" })
			.references(()=> habits.habit_id, {
				onDelete: "cascade",
			})
			.notNull(),
		difficulty: integer().notNull().default(1),
		created_at: timestamp().notNull().defaultNow(),
		completed_at: timestamp(),
		complete: boolean().notNull().default(false),
	},
	(table) => [
		pgPolicy("habit-daily-goal-update-policy", {
			for: "update",
			to: authenticatedRole,
			as: "permissive",
			using: sql`exists (
				select 1 from habits h
				where h.habit_id = ${table.habit_id}
				and h.owner_id = ${authUid}
			)`,
			withCheck: sql`exists (
				select 1 from habits h
				where h.habit_id = ${table.habit_id}
				and h.owner_id = ${authUid}
			)`,
		}),
		pgPolicy("habit-daily-goal-select-policy", {
			for: "select",
			to: authenticatedRole,
			as: "permissive",
			using: sql`exists (
				select 1 from habits h
				where h.habit_id = ${table.habit_id}
				and h.owner_id = ${authUid}
			)`,
		}),
	]
);