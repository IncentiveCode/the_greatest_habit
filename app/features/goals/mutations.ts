import type pkg from "@supabase/supabase-js";
import { DateTime } from "luxon";
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


export const createHabit = async (
	client: pkg.SupabaseClient<db>,
	{
		owner_id,
		title, 
		description, 
		keyword,
		difficulty
	}: {
		owner_id: string;
		title: string;
		description: string; 
		keyword: string;
		difficulty: number;
	}
) => {
	const sd = new Date();
	const startDate = sd.toISOString();
	const ed = new Date();
	ed.setDate(ed.getDate() + 3);
	const endDate = ed.toISOString();

	const { data, error } = await client
		.from("goals")
		.insert({
			title, 
			description,
			start_date: startDate,
			end_date: endDate,
			owner_id: owner_id,
			reward_id: 7,
			message_frequency: "once a day" as const, 
			created_at: startDate,
			updated_at: startDate,
			goal_type: "habit" as const,
			goal_status: "Started" as const,
			goal_period: "3 days" as const,
			difficulty: difficulty,
			keyword: keyword
		})
		.select("goal_id")
		.single();

		if (error) throw error;
		return data.goal_id;
};
	
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