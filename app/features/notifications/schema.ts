import { bigint, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { goals } from "../goals/schema";
import { profiles } from "../users/schema";

export const notificationType = pgEnum("notification_type", [
  "message",
  "review",
  "reply",
  "mention",
]);

export const notifications = pgTable("notifications", {
  notification_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  source_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  goal_id: bigint({ mode: "number" }).references(() => goals.goal_id, {
    onDelete: "cascade",
  }),
  target_id: uuid()
    .references(() => profiles.profile_id, {
      onDelete: "cascade",
    })
    .notNull(),
  type: notificationType().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});