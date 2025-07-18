import { data, Link, redirect, type MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Marquee } from "~/common/components/ui/marquee";
import { Tabs, TabsList, TabsTrigger } from "~/common/components/ui/tabs";
import { cn, formatForDashboard } from "~/lib/utils";
import { makeSSRClient } from "~/supa-client";
import { getChallenges } from "~/features/goals/queries";
import { HabitCard } from "~/features/goals/components/habit-card";
import { ActionCard } from "~/features/goals/components/action-card";
import { ChallengeCard } from "~/features/goals/components/challenge-card";
import { getUserById, getUserProfile } from "../queries";
import type { Route } from "./+types/dashboard-page";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data?.profile?.username}'s Dashboard | The greatest habit` },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { data: { user } } = await client.auth.getUser();
  if (user !== null) {
    const profile = await getUserById(client, { id: user?.id });
    const challenges = await getChallenges(client, { limit: 5 });
    return { profile, challenges };
  }
    
  redirect("/", { headers });
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
  if (loaderData === null || loaderData === undefined || 
      loaderData?.profile === null || loaderData?.challenges === null) {
    throw data(
      {
        error_code: "400",
        message: "로그인이 필요합니다.",
      },
      { status: 400 }
    );
  }

  const created_at = DateTime.fromISO(loaderData.profile.created_at, {
    zone: "utc",
  });
  console.log("created at :", created_at);

  return (
    <div>
      {
        /** 
         *  top card - greetings
         */
      }
      <Card className="flex flex-col rounded-md w-full bg-transparent">
        <CardHeader className="w-full">
          <CardTitle>어서오세요, {loaderData.profile.username} 님.</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          { formatForDashboard(created_at) }
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