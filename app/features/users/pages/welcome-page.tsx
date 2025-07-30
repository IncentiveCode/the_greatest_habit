import { Resend } from "resend";
import type { Route } from "./+types/welcome-page";
import WelcomeEmail from "react-email-starter/emails/welcome-email";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

const mailClient = 	new Resend(process.env.RESEND_API_KEY);

// get method
export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);

	const { data, error } = await mailClient.emails.send({
		from: 'The greatest habit <inceitve@mail.thegreatesthabit.com>',
		to: params?.email,
		subject: `${params?.username ?? ""}님, 환영합니다! 오늘부터 변화를 시작해보세요!`,
		react: <WelcomeEmail username={params?.username ?? ""} />,
	});

	if (error) throw error;
	return redirect("/", { headers });
};