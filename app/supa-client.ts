// default client
import { createClient } from "@supabase/supabase-js"
import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest"
import type { Database as SupabaseDatabase } from "database.types"

// default client
/*
const client = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_ANON_KEY!,
)

export default client;
 */

export type db = MergeDeep<SupabaseDatabase, {
	public: {
		Views: {
			challenge_list_view: {
				Row: SetNonNullable<
					SupabaseDatabase["public"]["Views"]["challenge_list_view"]["Row"]
				>;
			};
		}
	}
}>

// browser client & server side client
export const browserClient = createBrowserClient<db>(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_ANON_KEY!,
);

export const makeSSRClient = (request: Request) => {
	const headers = new Headers();
	const serverSideClient = createServerClient<db>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
					return cookies.map(({ name, value }) => ({ name, value: value ?? "" }));
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						headers.append(
							"Set-Cookie",
							serializeCookieHeader(name, value, options)
						);
					});
				},
			},
		}
	);

	return {
		client: serverSideClient,
		headers
	};
};

// admin client
export const adminClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);