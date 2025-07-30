import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/challenges-page";
import { Link } from "react-router";
import { Marquee } from "~/common/components/ui/marquee";
import { ChallengeCard } from "../components/challenge-card";
import { makeSSRClient } from "~/supa-client";
import { getChallenges } from "../queries";
import Hero from "~/common/components/hero";
import { CircleAlertIcon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Challenges | The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

type ChallengesLoaderData = {
  challenges: {
    count: number;
    description: string;
    end_date: string;
    goal_id: number;
    goal_status: NonNullable<"Not started" | "Started" | "Failed" | "Finished">;
    message_frequency: NonNullable<"None" | "once a day" | "once a week" | "once a month">;
    point: number;
    reward: string;
    start_date: string;
    title: string;
  }[]
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);

  var challenges = await getChallenges(client);
  return { challenges };
};

/*
  모든 챌린지 보기 버튼 원본 
    <Button 
      variant={ "ghost" }
      className="text-xl font-bold self-start" 
      asChild
    >
      <Link to="/challenges">모든 챌린지 보기 &rarr;</Link>
    </Button>
 */

export default function ChallengesPage({ loaderData }: { loaderData: ChallengesLoaderData }) {
  return (
    <div className="min-h-screen px-5 md:px-20">
      <Hero
				title="Challenges"
				description="습관 만들기가 처음이시라면,||여러 사람과 함께 진행하는 챌린지로 시작하기"
			/>

      <div className="flex flex-col gap-4 justify-center items-center pb-20">
        <CircleAlertIcon className="size-12" />
        <h1 className="text-xl text-semibold text-center">
          챌린지 메뉴를 준비하고 있습니다. <br/>
          조금만 기다려주세요.
        </h1>
        <Button variant={"outline"}>
          <Link to="/">홈화면으로 돌아가기</Link>
        </Button>
      </div>

      {
        /**
         *  challenge marquee 
         */
      }
      <Button 
        variant={ "ghost" }
        className="text-xl font-bold self-start" 
      >
        모든 챌린지 보기 &rarr;
      </Button>

      <div className="relative flex flex-col items-center justify-center overflow-hidden pb-10">
        <Marquee pauseOnHover className="[--duration:80s]">
          {loaderData.challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.goal_id}
              id={challenge.goal_id}
              name={challenge.title}
              description={challenge.description}
              participantCount={challenge.count}
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
}