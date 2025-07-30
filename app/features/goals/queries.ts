// default client
// import client from "~/supa-client";

// browser client, server side client
import type pkg from "@supabase/supabase-js";
import type { db } from "~/supa-client";
import { goals } from "./schema";

export const getChallengesWithLimit = async (
	client: pkg.SupabaseClient<db>,
	{ limit }: {limit: number }
) => {
	const { data, error } = await client
		.from("challenge_list_view")
		.select("*")
		.limit(limit);

	if (error) throw error;
	return data;
};

export const getChallenges = async (
	client: pkg.SupabaseClient<db>
) => {
	const { data, error } = await client
		.from("challenge_list_view")
		.select("*");

	if (error) throw error;
	return data;
};

export const getHabitsWithLimit = async (
	client: pkg.SupabaseClient<db>,
	{ limit }: {limit: number }
) => {
	const { data, error } = await client
		.from("habit_list_view")
		.select("*")
		.limit(limit);

	if (error) throw error;
	return data;
};

export const getHabits = async (
	client: pkg.SupabaseClient<db>
) => {
	const { data, error } = await client
		.from("habit_list_view")
		.select("*");

	if (error) throw error;
	return data;
};

export const getHabit = async (
	client: pkg.SupabaseClient<db>,
	{ goal_id, owner_id }: { goal_id: number, owner_id: string, }
) => {
	const { data, error } = await client
		.from("goals")
		.select("*")
		.eq("goal_id", goal_id)
		.eq("owner_id", owner_id)
		.single();

	if (error) throw error;
	return data;
};	

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