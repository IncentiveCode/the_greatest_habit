import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/habit-detail-page";
import { getLoggedInUserId, getUserById } from "~/features/users/queries";
import z from "zod";
import { getActions, getHabit } from "../queries";
import Hero from "~/common/components/hero";
import { DateTime } from "luxon";
import { formatForHabitDetail } from "~/lib/utils";
import { HabitCard } from "../components/habit-card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "~/common/components/ui/dialog";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data?.habit.title} | The greatest habit` },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

const paramSchema = z.object({
	habitId: z.coerce.number(),
});

type detailLoaderData = {
  habit: {
    description: string;
    end_date: string;
    goal_id: number;
    goal_status: NonNullable<"Not started" | "Started" | "Failed" | "Finished" | null>;
    message_frequency: NonNullable<"None" | "once a day" | "once a week" | "once a month" | null>;
    point: number;
    reward: string;
    start_date: string;
    title: string;
  },
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
  count: number
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });

  const { success, error, data } = paramSchema.safeParse(params);	
	if (!success) {
    throw new Response(`Invalid habit id, error : ${error}`, { status: 400 });
  }

  const habit = await getHabit(client, {
		goal_id: data.habitId,
		owner_id: user.profile_id,
	});

  const actions = await getActions(client, {
		goal_id: data.habitId,
		owner_id: user.profile_id,
  });
  const count = actions.length;

  return { habit, actions, count };
};

export default function HabitDetailPage({ loaderData }: { loaderData: detailLoaderData }) {
  const created_at = DateTime.fromISO(loaderData.habit.start_date, {
    zone: "utc",
  });

  const todayAction = loaderData.actions[loaderData.count - 1];
  console.log(todayAction);

  return (
    <div className="min-h-screen px-5 md:px-20 pt-28">
      <div className="flex flex-col items-center space-y-10">
        <Card className="w-full lg:w-2/3 bg-primary text-white">
          <CardHeader>
            <CardDescription className="w-full text-xs text-accent">Habit</CardDescription>
            <CardTitle className="text-lg font-bold">{loaderData.habit.title}</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <p>{loaderData.habit.description}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-end gap-2">
            <p className="text-accent text-xs">
              {loaderData.habit.start_date} ~ {loaderData.habit.end_date}
            </p>
          </CardFooter>
        </Card>
        <div className="w-full lg:w-2/3">
          <h3 className="text-lg font-bold mb-2">오늘의 할 일</h3>
        </div>
        <div className="w-full lg:w-2/3 flex flex-col gap-5">
          <h4 className="font-semibold">{todayAction.title}</h4>
          <p>{todayAction.description}</p>
          {todayAction.completed_at ? (
            <span>{todayAction.completed_at}</span>
          ) : (
            <Button>오늘의 목표 완료하기</Button>
          )}
        </div>
        <Separator className="w-full lg:w-2/3" />
        <div className="w-full lg:w-2/3">
          <h3 className="text-lg font-bold mb-2">행동 기록</h3>
          <div className="overflow-x-auto">
            <table className="min-w-max border-collapse">
              <tbody>
                <tr>
                  {loaderData.actions.map((action, idx) => (
                    <td key={idx} className="px-4 py-2 border-b text-center font-medium">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant={"link"} className="text-white font-bold">{action.start_date}</Button>
                        </DialogTrigger>
                        <DialogContent className="w-full md:max-w-[400px]">
                          <DialogTitle>{action.title}</DialogTitle>
                          <DialogDescription className="text-white">
                            {action.description}
                          </DialogDescription>
                          {action.completed_at ? (
                            <span>{action.completed_at}</span>
                          ) : (
                            <Button>오늘의 목표 완료하기</Button>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  ))}
                </tr>
                <tr>
                  {loaderData.actions.map((action, idx) => (
                    <td key={idx} className="px-4 py-2 text-center">
                      {action.completed_at ? (
                        <span className="text-white font-bold">O</span>
                      ) : (
                        <span className="text-accent font-bold">X</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

  {/* 
    <main className="flex flex-col items-center pt-16 pb-4">
      <section className="w-full max-w-xl bg-white rounded shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">{habit.title}</h2>
        <p className="mb-2 text-gray-700">{habit.description}</p>
      </section>

      <section className="w-full max-w-3xl">
      <h3 className="text-lg font-semibold mb-2">행동 기록</h3>
        <div className="overflow-x-auto">
          <table className="min-w-max border-collapse">
            <tbody>
              <tr>
                {actions.map((action, idx) => (
                  <td key={idx} className="px-4 py-2 border-b text-center font-medium bg-gray-50">
                    {action.date}
                  </td>
                ))}
              </tr>
              <tr>
                {actions.map((action, idx) => (
                  <td key={idx} className="px-4 py-2 text-center">
                    {action.done ? (
                      <span className="text-green-600 font-bold">O</span>
                    ) : (
                      <span className="text-red-400 font-bold">X</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
   */
  }