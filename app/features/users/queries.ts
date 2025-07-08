// default client
// import client from "~/supa-client";

// browser client, server side client
import type pkg from "@supabase/supabase-js";

export const getUserById = async (
  client: pkg.SupabaseClient,
  { id }: { id: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
				email,
        avatar,
        username
      `
    )
    .eq("profile_id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};