import { pgEnum, pgSchema, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const status = pgEnum("status", [
	"active", "inactive"
]);

export const profiles = pgTable("profiles", {
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
	email: text().notNull(),
	phone: text().notNull(),
  avatar: text(),
  first_name: text().notNull(),
  last_name: text().notNull(),
  username: text().notNull(),
  headline: text(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});