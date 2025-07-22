CREATE TABLE "faq_contents" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "faq_contents_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"group_id" bigint NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"sort_order" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "faq_contents" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "faq_groups" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "faq_groups_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text,
	"sort_order" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "faq_groups" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "faq_contents" ADD CONSTRAINT "faq_contents_group_id_faq_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."faq_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "faq-contents-policy" ON "faq_contents" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "faq-groups-policy" ON "faq_groups" AS PERMISSIVE FOR SELECT TO public;