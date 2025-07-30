import { redirect, type MetaFunction } from "react-router";
import type { Route } from "./+types/habits-page";
import Hero from "~/common/components/hero";
import { makeSSRClient } from "~/supa-client";
import { getHabits } from "../queries";
import { HabitCard } from "../components/habit-card";
import { getUserById } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Habits | The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

type habitsLoaderData = {
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
  count: number
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { data: { user } } = await client.auth.getUser();

  if (user === null || user === undefined) {
    redirect("/", { headers });
  } 
  else {
    const profile = await getUserById(client, { id: user?.id });
    var habits = await getHabits(client);
    var count = habits.length;
    return { profile, habits, count };
  }
};

export default function HabitsPage({ loaderData }: { loaderData: habitsLoaderData}) {
  return (
    <div className="min-h-screen">
      <Hero
        title={`${loaderData.profile.username} 님의 습관 형성 기록`}
        description={`지금까지 총 ${loaderData.count} 개의 습관을 만들기 위해 도전을 하고 있습니다.`}
			/>

      <div className="pb-10 px-10 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
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
  );
}