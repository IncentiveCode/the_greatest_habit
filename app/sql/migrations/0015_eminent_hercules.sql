CREATE TYPE "public"."goal_period" AS ENUM('3 days', '7 days', '21 days', '66 days', 'endless');--> statement-breakpoint
ALTER TYPE "public"."goal_type" ADD VALUE 'system';--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "goal_period" "goal_period" DEFAULT '3 days' NOT NULL;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "difficulty" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER POLICY "challenge_members_policy" ON "challenge_members" TO authenticated USING (
				"challenge_members"."profile_id" = (select auth.uid())
			);--> statement-breakpoint
ALTER POLICY "goals-select-policy" ON "goals" TO authenticated USING (
				EXISTS (SELECT 1 FROM challenge_members WHERE challenge_members.goal_id = "goals"."goal_id" AND challenge_members.profile_id = (select auth.uid()))
			);