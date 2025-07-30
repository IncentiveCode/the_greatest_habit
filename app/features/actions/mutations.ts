import type pkg from "@supabase/supabase-js";
import type { db } from "~/supa-client";

export const generateAction = async (
  client: pkg.SupabaseClient<db>,
	{ goal_id, owner_id, difficulty }: { goal_id: number, owner_id: string, difficulty: number },
  actions: { title: string, description: string}[]
) => {

	const sd = new Date();
	const date = sd.toISOString();

  const { error } = await client
		.from("action_plans")
		.insert(
			actions.map((action) => ({
				title: action.title,
				description: action.description,
				period: "day" as const,
				start_date: date, 	
				end_date: date,
				goal_id: goal_id,
				created_at: date,
				owner_id: owner_id, 
				difficulty: difficulty,
			}))
		);

  if (error) throw error;
};

export const setComplete = async (
  client: pkg.SupabaseClient<db>,
	{ ownerId, planId }: { ownerId: string, planId: number }
) => {

	const sd = new Date();
	const date = sd.toISOString();

	const { error } = await client
		.from("action_plans")
		.update({ completed_at: date })
		.eq("owner_id", ownerId)
		.eq("plan_id", planId);

	if (error) throw error;
};