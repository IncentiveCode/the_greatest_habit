import { sql } from "drizzle-orm";
import { bigint, boolean, integer, pgPolicy, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { anonRole } from "drizzle-orm/supabase";

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
			to: anonRole,
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
			to: anonRole,
			as: "permissive",
		}),
	]
);

export const faqGroups = pgTable(
	"faq_groups", {
		id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		name: text().notNull(),
		description: text(),
		sort_order: integer().notNull().default(1),
	},
	(table) => [
		pgPolicy("faq-groups-policy", {
			for: "select",
			to: anonRole,
			as: "permissive",
		}),
	]
);

export const faqContents = pgTable(
	"faq_contents", {
		id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
		group_id: bigint({ mode: "number" })
			.references(() => faqGroups.id, {
				onDelete: "cascade",
			})
			.notNull(),
		question: text().notNull(),
		answer: text().notNull(),
		sort_order: integer().notNull().default(1),
		is_active: boolean().notNull().default(true),
	},
	(table) => [
		pgPolicy("faq-contents-policy", {
			for: "select",
			to: anonRole,
			as: "permissive",
		}),
	]
);