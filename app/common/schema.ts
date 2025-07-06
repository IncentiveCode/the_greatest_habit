import { sql } from "drizzle-orm";
import { bigint, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const aboutContent = pgTable("about_content", {
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
	title: text().notNull(),
	description: text().notNull(),
	order: integer().notNull().default(1),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp().notNull().defaultNow(),
});

export const tutorialItem = pgTable("tutorial_item", {
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
	title: text().notNull(),
	description: text(),
	order: integer().notNull().default(1),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp().notNull().defaultNow(),
});

export const tutorialContent = pgTable("tutorial_content", {
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
	item_id: bigint({ mode: "number" })
		.references(() => tutorialItem.id, {
			onDelete: "cascade",
		})
		.notNull(),
	images: text().array().default(sql`'{}'::text[]`),
	descriptions: text().array().default(sql`'{}'::text[]`),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp().notNull().defaultNow(),
});