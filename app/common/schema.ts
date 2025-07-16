import { sql } from "drizzle-orm";
import { bigint, boolean, integer, pgPolicy, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const aboutContent = pgTable(
	"about_content", {
		id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		title: text().notNull(),
		description: text().notNull(),
		orderNo: integer().notNull().default(1),
		created_at: timestamp().notNull().defaultNow(),
		updated_at: timestamp().notNull().defaultNow(),
		state: boolean().notNull().default(true),
	},
	(table) => [
		pgPolicy("about-select-policy", {
			for: "select",
			to: "public",
			as: "permissive",
		}),
	]
);

export const tutorials = pgTable(
	"tutorials", {
		id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		title: text().notNull(),
		description: text(),
		order: integer().notNull().default(1),
		created_at: timestamp().notNull().defaultNow(),
		updated_at: timestamp().notNull().defaultNow(),
	},
	(table) => [
		pgPolicy("tutorials-select-policy", {
			for: "select",
			to: "public",
			as: "permissive",
		}),
	]
);

export const tutorialContent = pgTable(
	"tutorial_content", {
		id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		tutorial_id: bigint({ mode: "number" })
			.references(() => tutorials.id, {
				onDelete: "cascade",
			})
			.notNull(),
		images: text().array().default(sql`'{}'::text[]`),
		descriptions: text().array().default(sql`'{}'::text[]`),
		created_at: timestamp().notNull().defaultNow(),
		updated_at: timestamp().notNull().defaultNow(),
	},
	(table) => [
		pgPolicy("tutorial-content-select-policy", {
			for: "select",
			to: "public",
			as: "permissive",
		}),
	]
);