import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/settings-page";
import z from "zod";
import { getLoggedInUserId, getUserById } from "../queries";
import { updateUser, updateUserAvatar } from "../mutations";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { Avatar, AvatarFallback } from "~/common/components/ui/avatar";
import { Input } from "~/common/components/ui/input";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });
  return { user };
};

const phoneRegex = new RegExp(/^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/);
const formSchema = z.object({
  phone: z.string().regex(phoneRegex, 'Invalid PhoneNumber'),
  username: z.string(),
  headline: z.string().optional().default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");

  if (avatar && avatar instanceof File) {
    if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });

      if (error) {
        console.log(error);
        return { formErrors: { avatar: ["Failed to upload avatar"] } };
      }

      const {
        data: { publicUrl },
      } = await client.storage.from("avatars").getPublicUrl(data.path);

      await updateUserAvatar(client, {
        id: userId,
        avatarUrl: publicUrl,
      });
    } else {
      return { formErrors: { avatar: ["Invalid file size or type"] } };
    }
  } 
  else {
    const { success, error, data } = formSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!success) return { formErrors: error.flatten().fieldErrors };

    const { phone, username, headline } = data;
    const error2 = await updateUser(client, {
      id: userId,
      phone, 
      username,
      headline,
    });
    console.log(error2);

    return { ok: true, };
  }
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen pt-28 px-5 md:px-20 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-20">
        <div className="md:col-span-4 flex flex-col gap-10">
          {actionData?.ok ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your profile has been updated.
              </AlertDescription>
            </Alert>
          ) : null}
          <h2 className="text-2xl font-semibold">프로필 정보 수정</h2>

          <Form className="flex flex-col w-full md:w-3/4 gap-5" method="post">
            <InputPair
              label="사용자 이름"
              required
              id="username"
              defaultValue={loaderData.user.username}
              name="username"
              placeholder="John Doe"
            />
            {actionData?.formErrors && "username" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.username?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}

            <InputPair
              label="전화번호"
              id="phone"
              defaultValue={loaderData.user.phone ?? ""}
              name="phone"
              placeholder="010-0000-0000"
            />
            {actionData?.formErrors && "phone" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.phone?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            
            <InputPair
              label="인사말"
              defaultValue={loaderData.user.headline ?? ""}
              id="headline"
              name="headline"
              placeholder="짧은 자기 소개를 입력해주세요."
              textArea
            />
            {actionData?.formErrors && "headline" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.headline?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            
            <Button className="w-full">프로필 정보 수정</Button>
          </Form>
        </div>

        <Form
          className="md:col-span-2 p-6 rounded-lg border shadow-md flex flex-col gap-5"
          method="post"
          encType="multipart/form-data"
        >
          <Label className="flex flex-col gap-1">
            아바타 이미지
          </Label>
          <div className="flex flex-col space-y-5 justify-center items-center">
            <div className="size-40 rounded-full shadow-xl overflow-hidden border-1 border-white">
              {avatar ? (
                <img src={avatar} className="object-cover w-full h-full" />
              ) : (
                <Avatar className="size-40">
                  <AvatarFallback className="text-3xl bg-primary">
                    {loaderData.user.username[0]}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <Input
              type="file"
              className="w-full"
              onChange={onChange}
              required
              name="avatar"
            />
            {actionData?.formErrors && "avatar" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors.avatar.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}

            <div className="flex flex-col text-xs self-start">
              <span className="text-white">
                추천 크기 : 128x128px
              </span>
              <span className="text-white">
                파일 형태 : PNG, JPEG
              </span>
              <span className="text-white">최대 파일 크기 : 1MB</span>
            </div>
            <Button className="w-full">사진 변경</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}