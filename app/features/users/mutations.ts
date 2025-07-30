import type pkg from "@supabase/supabase-js";
import type { db } from "~/supa-client";

export const updateUser = async (
  client: pkg.SupabaseClient<db>,
  {
    id,
		phone,
    username,
    headline,
  }: {
    id: string;
		phone: string;
    username: string;
    headline: string;
  }
) => {
  const { error } = await client
    .from("profiles")
    .update({ phone, username, headline })
    .eq("profile_id", id);

	console.log(error);
  if (error) throw error;
};

export const updateUserAvatar = async (
  client: pkg.SupabaseClient<db>,
  {
    id,
    avatarUrl,
  }: {
    id: string;
    avatarUrl: string;
  }
) => {
  const { error } = await client
    .from("profiles")
    .update({ avatar: avatarUrl })
    .eq("profile_id", id);

  if (error) throw error;
};