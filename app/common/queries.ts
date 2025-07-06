import { asc } from "drizzle-orm";
import client from "~/supa-client";

export const getAboutContents = async () => {
	const { data, error } = await client
		.from("about_content")
		.select(`title, description`)
		.order("order", { ascending: true });

	if (error) throw new Error(error.message);
	return data;
}