import type pkg from "@supabase/supabase-js";
import { DateTime } from "luxon";
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

export const getTodayActions = async (
	client: pkg.SupabaseClient<db>,
	{ owner_id }: { owner_id: string, }
) => {
	
	const date = DateTime.now().startOf("day");

	const { data, error } = await client
		.from("action_plans")
		.select("*")
		.eq("owner_id", owner_id)
		.eq("start_date", date.toISO());

	if (error) throw error;
	return data;
};