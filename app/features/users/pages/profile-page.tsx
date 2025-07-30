import type { MetaFunction } from "react-router";
import { Form, Link, NavLink, useNavigation, useOutletContext } from "react-router";
import type { Route } from "./+types/profile-page";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getUserProfile } from "../queries";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { cn, formatForDashboard } from "~/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";
import { MailIcon, PhoneIcon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export const loader = async ({
  request,
  params,
}: Route.LoaderArgs & { params: { username: string } }) => {
  const { client } = makeSSRClient(request);
  const user = await getUserProfile(client, {
    username: params.username,
  });
  return { user };
};

export default function ProfilePage({
  loaderData,
  params,
}: Route.ComponentProps & { params: { username: string } }) {
  const { isSignIn, username } = useOutletContext<{
    isSignIn: boolean;
    username?: string;
  }>();
  const navigation = useNavigation();

  return (
    <div className="min-h-screen pt-28 px-5 md:px-20 space-y-10">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Avatar className="size-40 border-1 border-white">
          {loaderData.user.avatar ? (
            <AvatarImage src={loaderData.user.avatar} />
          ) : (
            <AvatarFallback className="text-3xl bg-primary">
              {loaderData.user.username[0]}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <h1 className="text-2xl w-full md:w-fit font-semibold">
              {loaderData.user.username}
            </h1>
            {isSignIn && username === params.username ? (
              <Button variant="outline" asChild>
                <Link to="/user/settings">Edit profile</Link>
              </Button>
            ) : null}
          </div>
          <div className="flex flex-col flex-wrap gap-2 items-start">
            <div className="flex gap-2 items-center">
              <MailIcon className="w-4 h-4 text-white" />
              <span className="text-sm text-white">
                {loaderData.user.email}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <PhoneIcon className="w-4 h-4 text-white" />
              <span className="text-sm text-white">
                {loaderData.user.phone}
              </span>
            </div>
            <span className="text-sm text-accent">
              { formatForDashboard(DateTime.fromISO(loaderData.user.created_at, { zone: "utc" })) }
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-screen-md flex flex-col space-y-10">
        <div className="space-y-2">
          <h4 className="text-lg font-bold">인사말</h4>
          {loaderData.user.headline ? (
            <p className="text-white">{loaderData.user.headline}</p>
          ) : (
            <p className="text-accent">
              Go to{" "}
              <Button variant={"link"} asChild className="p-0 text-white">
                <Link to="/user/settings">settings</Link>
              </Button>{" "}
              to add a headline to your profile.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/*
export default function ProfilePage() {
  const { headline, bio } = useOutletContext<{
    headline: string;
    bio: string;
  }>();
  return (
    
  );
}
 */