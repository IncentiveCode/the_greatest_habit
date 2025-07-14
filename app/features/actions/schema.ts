import { bigint, date, pgEnum, pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { goals } from "../goals/schema";
import { profiles } from "../users/schema";
import { authenticatedRole, authUid } from "drizzle-orm/supabase";
import { sql } from "drizzle-orm";

export const period = pgEnum("period", [
	"day", "week", "month",
]);

export const actionPlans = pgTable(
	"action_plans", {
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
		owner_id: uuid()
			.references(() => profiles.profile_id, {
				onDelete: "cascade",
			})
			.notNull(),
		created_at: timestamp().notNull().defaultNow(),
		completed_at: timestamp(),
	},
	(table) => [
		pgPolicy("actions-insert-policy", {
			for: "insert",
			to: authenticatedRole,
			as: "permissive",
			withCheck: sql`${authUid} = ${table.owner_id}`,
		}),
		pgPolicy("actions-select-policy", {
			for: "select",
			to: authenticatedRole,
			as: "permissive",
			using: sql`${authUid} = ${table.owner_id}`,
		}),
	]
);