import { data, Link, redirect, type MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { cn, formatForDashboard } from "~/lib/utils";
import { makeSSRClient } from "~/supa-client";
import { getHabitsWithLimit, getHabitsWithOwnerId } from "~/features/goals/queries";
import { getUserById } from "../queries";
import { DateTime } from "luxon";
import { ActionCard } from "~/features/goals/components/action-card";
import { HabitCard } from "~/features/goals/components/habit-card";
import type { Route } from "./+types/dashboard-page";
import { getActions, getTodayActions } from "~/features/actions/queries";

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data?.profile?.username ?? "Anonymous"}'s Dashboard | The greatest habit` },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

type DashboardLoaderData = {
  profile: {
     profile_id: string;
     email: string;
     phone: string | null;
     username: string;
     avatar: string | null;
     headline: string | null;
     status: "active" | "inactive";
     created_at: string;
  },
  habits: {
    description: string;
    end_date: string;
    goal_id: number;
    goal_status: NonNullable<"Not started" | "Started" | "Failed" | "Finished" | null>;
    message_frequency: NonNullable<"None" | "once a day" | "once a week" | "once a month" | null>;
    point: number;
    reward: string;
    start_date: string;
    title: string;
  }[],
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
  }[],
  actions: {
    plan_id: number;
    title: string;
    description: string;   
    period: NonNullable<"day" | "week" | "month" | null>;
    start_date: string;
    end_date: string;
    goal_id: number;
    created_at: string;
    completed_at: string;
    difficulty: number;
  }[],
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { data: { user } } = await client.auth.getUser();

  if (user) {
    const profile = await getUserById(client, { id: user?.id });
    var habits = await getHabitsWithOwnerId(client, { owner_id: profile.profile_id, limit: 5 });
    var actions = await getTodayActions(client, { owner_id: profile.profile_id });
    return { profile, habits, actions };
  }
  else 
  {
    console.log("로그인 정보 없음");
    return redirect("/auth/sign-in");
  }
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
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-accent/20",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function DashboardPage({ loaderData }: { loaderData: DashboardLoaderData }) {
  if (loaderData === null || loaderData === undefined || 
      loaderData?.profile === null || loaderData?.habits === null || loaderData?.challenges === null) {
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

  return (
    <div className="min-h-screen pt-28 px-5 md:px-20">
      {
        /** 
         *  top card - greetings
         */
      }
      <Card className="flex flex-col rounded-md w-full bg-white/90 text-background">
        <CardHeader className="w-full">
          <CardTitle>어서오세요, <b>{loaderData.profile.username}</b> 님.</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          { formatForDashboard(created_at) }
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row flex-wrap justify-end gap-5">
          <Button variant={"default"} className="w-full lg:w-1/3" asChild>
            <Link to="/create-habit">
              새로운 습관 형성에 도전하기
            </Link>
          </Button>
          { /*
          <Button variant="outline" className="w-full lg:w-1/3 text-white" asChild disabled>
            <Link to="/create-challenge">
              다른 사용자들과 함께 하는 챌린지 만들기
            </Link>
          </Button>
           */ }
        </CardFooter>
      </Card>

      {
        /** 
         *  main grid. 
         */
      }
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-start items-start pt-10 gap-10">
        {
          /**
           *  habit grid 
           */
        }
        <div className="w-full col-span-1 lg:col-span-2">
          <Button 
            variant={ "ghost" }
            className="text-xl font-bold self-start" 
            asChild
          >
            <Link to="/habits">모든 습관 보기 &rarr;</Link>
          </Button>
          <div className="grid lg:grid-cols-2 w-full gap-5 pt-2"> 
          {loaderData.habits.map((habit) => (
            <HabitCard
              key={habit.goal_id}
              id={habit.goal_id}
              name={habit.title}
              description={habit.description}
              startDate={habit.start_date}
              endDate={habit.end_date}
            />
          ))}
          </div>
        </div>

        {
          /**
           *  today's goal grid 
           */
        }
        <div className="w-full col-span-1 pt-10 pb-10 lg:pt-0">
          <div className="flex lg:flex-col gap-4 items-center">
            {/*
            <Button 
              variant={ "ghost" }
              className="text-xl font-bold self-start" 
              asChild
            >
              <Link to="/actions">모든 할 일 보기 &rarr;</Link>
            </Button>
            <Tabs defaultValue="day" className="w-full">
              <TabsList className="w-full bg-primary">
                <TabsTrigger value="day">오늘</TabsTrigger>
                <TabsTrigger value="week">이번 주</TabsTrigger>
                <TabsTrigger value="month">이번 달</TabsTrigger>
              </TabsList>
            </Tabs>
             */}
            <span className="text-xl font-bold self-start py-1">오늘의 목표</span>
          </div>
          <div className="grid grid-cols-1 w-full gap-5 pt-2"> 
          {loaderData.actions.map((action) => (
            <ActionCard
              key={action.plan_id}
              goal_id={`${action.plan_id}`}
              title={action.title}
              description={action.description}
              start_date={action.start_date}
              end_date={action.end_date}
              defaultChecked={action.completed_at !== null}
            />
          ))}
          </div>
        </div>
      </div> 


    </div>
  );
}