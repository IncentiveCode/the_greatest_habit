import { Resend } from "resend";
// import { render } from "@react-email/components";
import type { Route } from "./+types/welcome-page";
import WelcomeEmail from "react-email-starter/emails/welcome-email";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

const mailClient = 	new Resend(process.env.RESEND_API_KEY);

// get method
export const loader = async ({ params, request }: Route.LoaderArgs) => {
	// not using resend
	// const html = await render(<WelcomeEmail username={params.username} />);

  const { client, headers } = makeSSRClient(request);

	const { data, error } = await mailClient.emails.send({
		from: 'The greatest habit <inceitve@mail.thegreatesthabit.com>',
		to: params?.email,
		subject: '환영합니다! 오늘부터 당신의 변화를 시작해보세요.',
		react: <WelcomeEmail username={params?.username ?? "Logan"} />,
	});

	if (error) throw error;
	// return Response.json({ data, error });
	return redirect("/", { headers });
};