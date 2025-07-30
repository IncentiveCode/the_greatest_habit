import { getAboutContents } from "../queries";
import { AboutCard } from "../components/about-card";
import type { Route } from "./+types/about-page";
import { makeSSRClient } from "~/supa-client";
import Hero from "../components/hero";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs ) => {
	const { client, headers } = makeSSRClient(request);
	const contents = await getAboutContents(client);
	return { contents };
}

export default function AboutPage({loaderData}: Route.ComponentProps) {
	return (
    <div className="min-h-screen px-5 md:px-20">
			<Hero
				title="The greatest habit"
				description="우리의 서비스를 소개합니다"
			/>

			<div className="space-y-10 pb-10">
				<h1 className="text-lg md:text-2xl font-semibold text-center">
					혹시 이런 경험이 있으신가요?
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
					<Card className="w-full justify-self-center bg-primary text-white leading-relaxed">
						<CardHeader>
							<CardTitle>
								<h3 className="md:text-xl font-bold text-center">
									잃어버린 시간
								</h3>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-center text-white">
								연초에 큰 뜻을 품고 목표를 세웠지만, 연말에도 진행률이 0% 였던 경험
							</p>
						</CardContent>
					</Card>

					<Card className="w-full justify-self-center bg-primary text-white leading-relaxed">
						<CardHeader>
							<CardTitle>
								<h3 className="md:text-xl font-bold text-center">
									작심삼일도 아닌, 작심일일
								</h3>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-center">
								좋은 습관을 만들겠다며 도전했지만, 2일 차에 멈춰버린 경험
							</p>
						</CardContent>
					</Card>

					<Card className="w-full justify-self-center bg-primary text-white leading-relaxed">
						<CardHeader>
							<CardTitle>
								<h3 className="md:text-xl font-bold text-center">
									시간이 흘러도 여전히 제자리걸음
								</h3>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-center">
								일과 사람에 치여, 아무런 도전도 하지 못한 채 시간을 흘려보낸 경험
							</p>
						</CardContent>
					</Card>
				</div>

				<h1 className="text-lg md:text-2xl font-semibold text-center pt-10">
          우리는 이렇게 도와드립니다
				</h1>

				<div className="text-sm md:text-lg text-left">
					<ul className="leading-relaxed my-6 ml-6 list-disc [&>li]:mt-2">
						<li>당신의 목표가 단순한 기록으로 끝나지 않도록 합니다.</li>
						<li>작은 습관을 쌓아가며 변화가 시작되도록 돕습니다.</li>
						<li>지속적인 알림으로 목표를 잊지 않게 합니다.</li>
						<li>무리하지 않도록, 목표에 맞는 일일 과제를 제공합니다.</li>
					</ul>
				</div>

				<h1 className="text-lg md:text-2xl font-semibold text-center pt-10">
          우리가 함께하는 여정
				</h1>

				<div className="pt-5 space-y-2">
					<blockquote className="mt-6 border-l-2 pl-6 italic">
						… 효과가 없을 경우 지레 낙심하지 말고, 최소한 21일 동안은 판단을 보류하고 묵묵히 실천해 나가라. 우리의 정신적 이미지에 자각할 수 있을 정도의 변화가 나타나려면 적어도 21일은 지나야 하기 때문이다. …’
					</blockquote>
					<h2 className="scroll-m-20 pb-2 text-sm md:text-lg text-right tracking-tight first:mt-0">
						맥스웰 몰츠(Maxwell Maltz) 저 ‘성공의 법칙’
					</h2>
				</div>

				<div className="pt-5 space-y-2">
					<blockquote className="mt-6 border-l-2 pl-6 italic">
						습관이 형성되었다고 판단할 수 있는 상태에 도달하는 데 걸리는 평균 시간은 66일이었고 …
					</blockquote>
					<h2 className="scroll-m-20 pb-2 text-sm md:text-lg text-right tracking-tight first:mt-0">
						필리파 랠리 (Phillippa Lally) 의 논문, ‘습관은 어떻게 형성되는가’ (2010)
					</h2>
				</div>

				<div className="text-sm md:text-lg text-center">
					시작하자마자, 3일 차에, 일주일 차에... <br/>
					그리고 그 이후에도 찾아오는 수많은 고비.<br/>
					우리는 당신이 그 고비를 넘고,<br/>
					습관 형성의 기준이라 불리는 <b>21일, 66일</b>을 넘어<br/>
					<b>좋은 습관을 만드실 수 있도록 돕겠습니다.</b>
				</div>

				{ /*
				<div className="flex flex-col gap-10 justify-center items-center w-full">
				{loaderData.contents.map((content) => (
					<AboutCard title={content.title} content={content.description} />
				))}
				</div>
				*/ }
			</div>
		</div>
	);
}