import { sql } from "drizzle-orm";
import { bigint, pgEnum, pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authenticatedRole, authUid, authUsers } from "drizzle-orm/supabase";
import { goals } from "../goals/schema";

/** 
const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});
 */

export const status = pgEnum("status", [
	"active", "inactive"
]);

export const notificationType = pgEnum("notification_type", [
  "message",
  "review",
  "reply",
  "mention",
]);

export const profiles = pgTable(
  "profiles", {
    profile_id: uuid()
      .primaryKey()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    email: text().notNull(),
    phone: text(),
    avatar: text(),
    username: text().notNull(),
    headline: text(),
    status: status().default("active").notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
    provider: text().notNull().default("e-mail"),
  },
  (table) => [
    pgPolicy("profiles-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.profile_id}`,
    }), 
  ]
);

export const notifications = pgTable(
  "notifications", {
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
  },
  (table) => [
    pgPolicy("notifications-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`${authUid} = ${table.target_id}`,
    }),
  ]
);