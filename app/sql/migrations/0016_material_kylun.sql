ALTER TABLE "goals" ALTER COLUMN "reward_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "challenge_members" ADD COLUMN "goal_status" "goal_status" DEFAULT 'Not started' NOT NULL;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "keyword" text DEFAULT '생활 습관' NOT NULL;