import { bigint, integer, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const rewards = pgTable("rewards", {
	reward_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
	title: text().notNull(),
	point: integer().notNull(),
	created_at: timestamp().notNull().defaultNow()
});

export const reward_history = pgTable("reward_history", 
	{
		profile_id: uuid().references(() => profiles.profile_id, {
			onDelete: "cascade"
		}),
		reward_id: bigint({ mode: "number" }).references(() => rewards.reward_id, {
			onDelete: "cascade"
		}),
	},
	(table) => [primaryKey({ columns: [table.profile_id, table.reward_id] })]
);