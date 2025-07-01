import { bigint, date, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rewards } from "~/features/reward/schema";
import { profiles } from "../users/schema";

export const goal_type = pgEnum("goal_type", [
	"habit", "goal"
]);

export const message_frequency = pgEnum("message_frequency", [
	"None", "once a day", "once a week", "once a month"
]);

export const goals = pgTable("goals", {
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
		})
		.notNull(),
	message_frequency: message_frequency().notNull(),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp().notNull().defaultNow(),
});