import { bigint, integer, pgPolicy, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { authenticatedRole } from "drizzle-orm/supabase";

export const rewards = pgTable(
	"rewards", {
		reward_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		title: text().notNull(),
		point: integer().notNull(),
		created_at: timestamp().notNull().defaultNow()
	},
	(table) => [
		pgPolicy("reward-select-policy"), {
			for: "select",
			to: authenticatedRole,
			as: "permissive",
		}
	]
);

export const reward_history = pgTable("reward_history", 
	{
		profile_id: uuid().references(() => profiles.profile_id, {
			onDelete: "cascade"
		}),
		reward_id: bigint({ mode: "number" }).references(() => rewards.reward_id, {
			onDelete: "cascade"
		}),
		remains: integer().notNull().default(0),
	},
	(table) => [
		primaryKey({ columns: [table.profile_id, table.reward_id] }),
		pgPolicy("reward_history_select_policy", {
			for: "select",
			to: authenticatedRole,
			as: "permissive",
		}),
	]
);