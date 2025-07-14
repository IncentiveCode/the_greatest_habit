ALTER TYPE "public"."goal_type" ADD VALUE 'challenge';--> statement-breakpoint
CREATE TABLE "challenge_members" (
	"goal_id" bigint NOT NULL,
	"profile_id" uuid NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "challenge_members_goal_id_profile_id_pk" PRIMARY KEY("goal_id","profile_id")
);

--> statement-breakpoint
ALTER TABLE "tutorials" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "action_plans" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "goals" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "reward_history" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "notifications" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "about_content" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "tutorial_content" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint

ALTER TABLE "tutorial_content" RENAME COLUMN "item_id" TO "tutorial_id";--> statement-breakpoint
--> statement-breakpoint
ALTER TABLE "action_plans" ADD COLUMN "owner_id" uuid;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "goal_type" "goal_type" DEFAULT 'habit' NOT NULL;--> statement-breakpoint
ALTER TABLE "reward_history" ADD COLUMN "remains" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "challenge_members" ADD CONSTRAINT "challenge_members_goal_id_goals_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("goal_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenge_members" ADD CONSTRAINT "challenge_members_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_plans" ADD CONSTRAINT "action_plans_owner_id_profiles_profile_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tutorial_content" ADD CONSTRAINT "tutorial_content_tutorial_id_tutorials_id_fk" FOREIGN KEY ("tutorial_id") REFERENCES "public"."tutorials"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "actions-insert-policy" ON "action_plans" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "action_plans"."owner_id");--> statement-breakpoint
CREATE POLICY "actions-select-policy" ON "action_plans" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "action_plans"."owner_id");--> statement-breakpoint
CREATE POLICY "goals-insert-policy" ON "goals" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "goals"."owner_id");--> statement-breakpoint
CREATE POLICY "goals-select-policy" ON "goals" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "goals"."owner_id");--> statement-breakpoint
CREATE POLICY "notifications-select-policy" ON "notifications" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "notifications"."target_id");--> statement-breakpoint
CREATE POLICY "reward_history_select_policy" ON "reward_history" AS PERMISSIVE FOR SELECT TO "authenticated";--> statement-breakpoint
CREATE POLICY "challenge_members_policy" ON "challenge_members" AS PERMISSIVE FOR SELECT TO "authenticated";--> statement-breakpoint