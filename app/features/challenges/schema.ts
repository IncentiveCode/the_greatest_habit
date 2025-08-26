import { bigint, boolean, date, integer, pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { goal_period, goal_status, message_frequency } from "../goals/schema";
import { anonRole, authenticatedRole, authUid } from "drizzle-orm/supabase";
import { sql } from "drizzle-orm";

export const challenges = pgTable(
	"challenges", {
		challenge_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		owner_id: uuid()
			.references(() => profiles.profile_id, {
				onDelete: "cascade",
			})
			.notNull(),
		title: text().notNull(),
		description: text(),
		start_date: date().notNull().defaultNow(),
		end_date: date().notNull().defaultNow(),
		created_at: timestamp().notNull().defaultNow(),
		updated_at: timestamp().notNull().defaultNow(),
		message_frequency: message_frequency().notNull().default("once a day"),
		goal_status: goal_status().notNull().default("Started"),
		goal_period: goal_period().notNull().default("7 days"),
		keyword: text().notNull().default("생활 습관"),
	},
	(table) => [
		pgPolicy("challenges-insert-policy", {
			for: "insert",
			to: authenticatedRole,
			as: "permissive",
			withCheck: sql`${authUid} = ${table.owner_id}`,
		}),
		pgPolicy("challenges-update-policy", {
			for: "update",
			to: authenticatedRole,
			as: "permissive",
			using: sql`${authUid} = ${table.owner_id}`,
			withCheck: sql`${authUid} = ${table.owner_id}`,
		}),
		pgPolicy("challenges-select-policy", {
			for: "select",
			to: anonRole,
			as: "permissive",
		}),
	]
);

export const ChallengeParticipants = pgTable(
	"challenge_participants", {
		participant_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		challenge_id: bigint({ mode: "number" })
			.references(()=> challenges.challenge_id, {
				onDelete: "cascade",
			})
			.notNull(),	
		user_id: uuid()
			.references(() => profiles.profile_id, {
				onDelete: "cascade",
			})
			.notNull(),
	},
	(table) => [
		pgPolicy("challenge-participants-insert-policy", {
			for: "insert",
			to: authenticatedRole,
			as: "permissive",
			withCheck: sql`${authUid} = ${table.user_id}`,
		}),
		pgPolicy("challenge-participants-select-policy", {
			for: "select",
			to: anonRole,
			as: "permissive",
		}),
	]
);

export const ChallengeDailyGoals = pgTable(
	"challenge_daily_goals", {
		goal_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		challenge_id: bigint({ mode: "number" })
			.references(()=> challenges.challenge_id, {
				onDelete: "cascade",
			})
			.notNull(),
		difficulty: integer().notNull().default(1),
		created_at: timestamp().notNull().defaultNow(),
		completed_at: timestamp(),
		complete: boolean().notNull().default(false),
	},
	(table) => [
		pgPolicy("challenge-daily-goal-update-policy", {
			for: "update",
			to: authenticatedRole,
			as: "permissive",
			using: sql`exists (
				select 1 from challenge_participants c
				where c.challenge_id = ${table.challenge_id}
				and c.user_id = ${authUid}
			)`,
			withCheck: sql`exists (
				select 1 from challenge_participants c
				where c.challenge_id = ${table.challenge_id}
				and c.user_id = ${authUid}
			)`,
		}),
		pgPolicy("challenge-daily-goal-select-policy", {
			for: "select",
			to: authenticatedRole,
			as: "permissive",
			using: sql`exists (
				select 1 from challenge_participants c
				where c.challenge_id = ${table.challenge_id}
				and c.user_id = ${authUid}
			)`,
		}),
	]
);