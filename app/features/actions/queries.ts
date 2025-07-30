import type pkg from "@supabase/supabase-js";
import type { db } from "~/supa-client";

export const getActions = async (
	client: pkg.SupabaseClient<db>,
	{ goal_id, owner_id }: { goal_id: number, owner_id: string, }
) => {
	const { data, error } = await client
		.from("action_plans")
		.select("*")
		.eq("goal_id", goal_id)
		.eq("owner_id", owner_id);

	if (error) throw error;
	return data;
};	