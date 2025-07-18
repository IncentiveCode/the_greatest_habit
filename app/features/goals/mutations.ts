import type pkg from "@supabase/supabase-js";
import type { db } from "~/supa-client";

export const insertChallenges = async (
  client: pkg.SupabaseClient<db>,
  challenges: { title: string, description: string}[]
) => {

	const sd = new Date();
	const startDate = sd.toISOString();
	const ed = new Date();
	ed.setDate(ed.getDate() + 21);
	const endDate = ed.toISOString()

  const { error } = await client
		.from("goals")
		.insert(
			challenges.map((challenge) => ({
				title: challenge.title,
				description: challenge.description,
				start_date: startDate, 	
				end_date: endDate,
			 	owner_id: "14f68b63-414e-41de-8738-ae96f1104e37", 
				reward_id: 6, 
				message_frequency: "once a day" as const,
				created_at: startDate,
				updated_at: startDate,
				goal_type: "challenge" as const,
				goal_status: "Started" as const,
			}))
		);

  if (error) throw error;
};