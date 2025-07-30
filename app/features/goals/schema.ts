import { bigint, date, integer, pgEnum, pgPolicy, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rewards } from "~/features/rewards/schema";
import { profiles } from "../users/schema";
import { authenticatedRole, authUid } from "drizzle-orm/supabase";
import { sql } from "drizzle-orm";

export const goal_status = pgEnum("goal_status", [
	"Not started", "Started", "Failed", "Finished"
]);

export const goal_type = pgEnum("goal_type", [
	"habit", "challenge", "system",
]);

export const message_frequency = pgEnum("message_frequency", [
	"None", "once a day", "once a week", "once a month"
]);

export const goal_period = pgEnum("goal_period", [
	"3 days", "7 days", "21 days", "66 days", "endless"
]);

export const goals = pgTable(
	"goals", {
		goal_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		title: text().notNull(),
		description: text().notNull(),
		start_date: date().notNull().defaultNow(),
		end_date: date().notNull().defaultNow(),
		owner_id: uuid()
			.references(() => profiles.profile_id, {
				onDelete: "cascade",
			})
			.notNull(),
		reward_id: bigint({ mode: "number" })
			.references(() => rewards.reward_id, {
				onDelete: "cascade",
			}),
		message_frequency: message_frequency().notNull().default("once a day"),
		created_at: timestamp().notNull().defaultNow(),
		updated_at: timestamp().notNull().defaultNow(),
		goal_type: goal_type().notNull().default("habit"),
		goal_status: goal_status().notNull().default("Started"),
		goal_period: goal_period().notNull().default("3 days"),
		difficulty: integer().notNull().default(1),
		keyword: text().notNull().default("생활 습관"),
	},
	(table) => [
		pgPolicy("goals-insert-policy", {
			for: "insert",
			to: authenticatedRole,
			as: "permissive",
			withCheck: sql`${authUid} = ${table.owner_id}`,
		}),
		pgPolicy("goals-select-policy", {
			for: "select",
			to: authenticatedRole,
			as: "permissive",
			using: sql`${authUid} = ${table.owner_id}`,
		}),
	]
);
// ${table.owner_id} = ${authUid}
// OR EXISTS (SELECT 1 FROM ${challengeMembers} WHERE ${challengeMembers.goal_id} = ${table.goal_id} AND ${challengeMembers.profile_id} = ${authUid})

export const challengeMembers = pgTable(
	"challenge_members", {
		goal_id: bigint({ mode: "number" })
			.references(() => goals.goal_id, {
				onDelete: "cascade",
			}
		).notNull(),
		profile_id: uuid()
			.references(() => profiles.profile_id, {
				onDelete: "cascade",
			}
		).notNull(),
		joined_at: timestamp().notNull().defaultNow(),
		goal_status: goal_status().notNull().default("Not started"),
	},
	(table) => [
		primaryKey({ columns: [table.goal_id, table.profile_id] }),
		pgPolicy("challenge_members_policy", {
			for: "select",
			to: authenticatedRole,
			as: "permissive",
			using: sql`
				${table.profile_id} = ${authUid}
			`,
		}),
	]
);