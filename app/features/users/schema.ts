import { pgEnum, pgSchema, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const users = pgSchema("auth").table("users", {
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
	phone: text(),
  avatar: text(),
  username: text().notNull(),
  headline: text(),
  status: status().default("active").notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});