// import client from "~/supa-client";

// browser client, server side client
import type pkg from "@supabase/supabase-js";
import type { db } from "~/supa-client";

export const getAboutContents = async (client: pkg.SupabaseClient<db>) => {
	const { data, error } = await client
		.from("about_content")
		.select(`
			title, 
			description
		`)
		.eq("state", true)
		.order("orderNo", { ascending: true });

	if (error) throw new Error(error.message);
	return data;
}