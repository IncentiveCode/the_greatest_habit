import { Link, type MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Marquee } from "~/common/components/ui/marquee";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/common/components/ui/tabs";
import { cn } from "~/lib/utils";
import { ChallengeCard } from "../components/challenge-card";
import { HabitCard } from "../components/habit-card";
import { ActionCard } from "../components/action-card";
import ChallengeSampleCard from "~/features/goals/components/challenge-card";
import type { Route } from "./+types/dashboard";
import { makeSSRClient } from "~/supa-client";
import { getChallenges } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const challenges = await getChallenges(client, { limit: 5 });
  return { challenges };
};

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      {
        /** 
         *  top card - greetings
         */
      }
      <Card className="flex flex-col rounded-md w-full bg-transparent">
        <CardHeader className="w-full">
          <CardTitle>어서오세요, @username 님.</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          최고의 습관을 만들기 시작한지 1000일 째 입니다.
        </CardContent>
      </Card>

      {
        /** 
         *  main grid. 
         */
      }
      <div className="grid grid-cols-1 md:grid-cols-3 justify-start items-start pt-10 gap-5">
        {
          /**
           *  habit grid 
           */
        }
        <div className="w-full col-span-1 md:col-span-2">
          <Button 
            variant={ "ghost" }
            className="text-xl font-bold self-start" 
            asChild
          >
            <Link to="/habits">모든 습관 보기 &rarr;</Link>
          </Button>
          <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-5 pt-2"> 
          {loaderData.challenges.map((challenge) => (
            <HabitCard
              key={challenge.goal_id}
              id={challenge.goal_id}
              name={challenge.title}
              description={challenge.description}
            />
          ))}
          </div>
        </div>

        {
          /**
           *  today's goal grid 
           */
        }
        <div className="w-full col-span-1">
          <div className="flex gap-4 items-center">
            <h2 className="text-lg font-bold">할 일</h2>
            <Tabs defaultValue="day" className="w-1/2">
              <TabsList>
                <TabsTrigger value="day">오늘</TabsTrigger>
                <TabsTrigger value="week">이번 주</TabsTrigger>
                <TabsTrigger value="month">이번 달</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 w-full gap-5 pt-2"> 
          {Array.from({ length: 6 }).map((_, index) => (
            <ActionCard
              key={`action_${index}`}
              id={`action_${index}`}
              title={`할 일 ${index + 1}`}
              description="할 일에 대한 간단한 설명이 들어갑니다."
              defaultChecked={false}
            />
          ))}
          </div>
        </div>
      </div> 

      {
        /**
         *  challenge grid 
         */
      }
      <div className="pt-10">&nbsp;</div>
        <Button 
          variant={ "ghost" }
          className="text-xl font-bold self-start" 
          asChild
        >
          <Link to="/challenges">모든 챌린지 보기 &rarr;</Link>
        </Button>

        <div className="relative flex flex-col items-center justify-center overflow-hidden">
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