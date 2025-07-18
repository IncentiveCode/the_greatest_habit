// default client
// import client from "~/supa-client";

// browser client, server side client
import type pkg from "@supabase/supabase-js";
import type { db } from "~/supa-client";

export const getChallenges = async (
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