CREATE TYPE "public"."period" AS ENUM('day', 'week', 'month');--> statement-breakpoint
CREATE TYPE "public"."goal_type" AS ENUM('habit', 'goal');--> statement-breakpoint
CREATE TYPE "public"."message_frequency" AS ENUM('None', 'once a day', 'once a week', 'once a month');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('message', 'review', 'reply', 'mention');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE "action_plans" (
	"plan_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "action_plans_plan_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"description" text NOT NULL,
	"period" "period" NOT NULL,
	"start_date" date DEFAULT now() NOT NULL,
	"end_date" date DEFAULT now() NOT NULL,
	"goal_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "goals" (
	"goal_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "goals_goal_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"description" text NOT NULL,
	"start_date" date DEFAULT now() NOT NULL,
	"end_date" date DEFAULT now() NOT NULL,
	"owner_id" uuid NOT NULL,
	"reward_id" bigint NOT NULL,
	"message_frequency" "message_frequency" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"notification_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "notifications_notification_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"source_id" uuid,
	"goal_id" bigint,
	"target_id" uuid NOT NULL,
	"type" "notification_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reward_history" (
	"profile_id" uuid,
	"reward_id" bigint,
	CONSTRAINT "reward_history_profile_id_reward_id_pk" PRIMARY KEY("profile_id","reward_id")
);
--> statement-breakpoint
CREATE TABLE "rewards" (
	"reward_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "rewards_reward_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"point" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"profile_id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"avatar" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"username" text NOT NULL,
	"headline" text,
	"status" "status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "action_plans" ADD CONSTRAINT "action_plans_goal_id_goals_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("goal_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_owner_id_profiles_profile_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_reward_id_rewards_reward_id_fk" FOREIGN KEY ("reward_id") REFERENCES "public"."rewards"("reward_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_source_id_profiles_profile_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_goal_id_goals_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("goal_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_target_id_profiles_profile_id_fk" FOREIGN KEY ("target_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_history" ADD CONSTRAINT "reward_history_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_history" ADD CONSTRAINT "reward_history_reward_id_rewards_reward_id_fk" FOREIGN KEY ("reward_id") REFERENCES "public"."rewards"("reward_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_profile_id_users_id_fk" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;