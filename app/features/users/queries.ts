// default client
// import client from "~/supa-client";

// browser client, server side client
import type { db } from "~/supa-client";
import type pkg from "@supabase/supabase-js";
import { redirect } from "react-router";

export const getUserProfile = async (
  client: pkg.SupabaseClient<db>,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
				email,
        phone,
        username,
        avatar,
        headline,
        status,
        created_at
      `
    )
    .eq("username", username)
    .single();

  if (error) throw error;
  return data;
};

export const getUserById = async (
  client: pkg.SupabaseClient<db>,
  { id }: { id: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
				email,
        phone,
        username,
        avatar,
        headline,
        status,
        created_at
      `
    )
    .eq("profile_id", id)
    .single();

  if (error) throw error;
  return data;
};

export const getLoggedInUserId = async (
  client: pkg.SupabaseClient<db>
) => {
  const { data, error } = await client.auth.getUser();
  if (error || data.user === null) {
    throw redirect("/auth/login");
  }

  return data.user.id;
};