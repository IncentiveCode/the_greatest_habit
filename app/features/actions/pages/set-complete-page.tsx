import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/set-complete-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { setComplete } from "../mutations";
import z from "zod";

const paramSchema = z.object({
	planId: z.coerce.number(),
});

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const { success, error, data } = paramSchema.safeParse(params);	
	if (!success) {
    throw new Response(`Invalid plan id, error : ${error}`, { status: 400 });
  }

	const planId = data.planId;
	const { client } = makeSSRClient(request);
	const ownerId = await getLoggedInUserId(client);
	await setComplete(
		client,
		{ ownerId, planId }
	);

	return {
		ok: true
	}
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  // if (request.method !== "POST") {
  // return new Response("Method not allowed", { status: 405 });
  // }

	const { success, error, data } = paramSchema.safeParse(params);	
	if (!success) {
    throw new Response(`Invalid plan id, error : ${error}`, { status: 400 });
  }

	const planId = data.planId;
	const { client } = makeSSRClient(request);
	const ownerId = await getLoggedInUserId(client);
	await setComplete(
		client,
		{ ownerId, planId }
	);

	return {
		ok: true
	}
};