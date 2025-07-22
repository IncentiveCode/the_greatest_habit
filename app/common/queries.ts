// import client from "~/supa-client";

// browser client, server side client
import type pkg from "@supabase/supabase-js";
import type { db } from "~/supa-client";
import { faqContents } from "./schema";
import { eq } from "drizzle-orm";

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

export const getFaqGroups = async (client: pkg.SupabaseClient<db>) => {
	const { data, error } = await client
		.from("faq_groups")
		.select("*");

	if (error) throw new Error(error.message);
	return data;
}

export const getFaqContents = async (
	client: pkg.SupabaseClient<db>, 
	{
		group_id
	}: {
		group_id: number;
	}
) => {
	const { data, error } = await client
		.from("faq_contents")
		.select(`
			group_id, question, answer, sort_order
		`)
		.eq("group_id", group_id)
		.order("sort_order", { ascending: true });

	if (error) throw new Error(error.message);
	return data;
}