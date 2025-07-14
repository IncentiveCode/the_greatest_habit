CREATE TYPE "public"."goal_status" AS ENUM('Not started', 'Started', 'Failed', 'Finished');--> statement-breakpoint
ALTER TABLE "rewards" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "goal_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "goal_type" SET DEFAULT 'habit'::text;--> statement-breakpoint
DROP TYPE "public"."goal_type";--> statement-breakpoint
CREATE TYPE "public"."goal_type" AS ENUM('habit', 'challenge');--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "goal_type" SET DEFAULT 'habit'::"public"."goal_type";--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "goal_type" SET DATA TYPE "public"."goal_type" USING "goal_type"::"public"."goal_type";--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "goal_status" "goal_status" DEFAULT 'Not started' NOT NULL;--> statement-breakpoint
CREATE POLICY "reward-select-policy" ON "rewards" AS PERMISSIVE FOR ALL TO public;--> statement-breakpoint
CREATE POLICY "profiles-select-policy" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "profiles"."profile_id");