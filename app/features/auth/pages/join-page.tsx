import { Form, Link, redirect, useNavigation, type MetaFunction } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { SENTENCES } from "~/common/sentences";
import { getRandomInt } from "~/lib/utils";
import type { Route } from "./+types/join-page";
import z from "zod";
import { checkUsernameExists } from "../queries";
import { adminClient, makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

const formSchema = z.object({
  email: z.string({
    required_error: "'e-mail'이 입력되지 않았습니다.",
    invalid_type_error: "입력된 값이 e-mail 형식에 맞지 않습니다.",
  }).email("잘못된 e-mail 형식입니다."),
  username: z.string({
    required_error: "'이름'이 입력되지 않았습니다.",
  }).min(2, {
    message: "최소 2글자 이상의 이름을 입력해주세요.",
  }),
  password: z.string().min(8, {
    message: "최소 8글자 이상의 비밀번호를 입력해주세요.",
  }),
  password_confirm: z.string().min(8, {
    message: "최소 8글자 이상의 비밀번호를 입력해주세요.",
  }),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  /**
  // 계정 삭제를 위한 임시 코드
  const { client, headers } = makeSSRClient(request);
  const { data, error } = await adminClient.auth.admin.deleteUser(
    'f6474963-4d69-42a8-87b2-3af3ad61bc04'
  )
  console.log('계정 삭제 오류 : ', error)
  // */

  const randIndex = getRandomInt(0, SENTENCES.length - 1);
  const sentence = SENTENCES[randIndex];
  return { sentence };
}

export const action = async ({ request }: Route.ActionArgs) => {
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData)); 
  if (!success) {
    return {
      signUpError: null,
      formErrors: error.flatten().fieldErrors
    };
  }

  const passwordEquals = data.password === data.password_confirm;
  if (!passwordEquals) {
    return {
      signUpError: null,
      formErrors: { password_confirm: ["비밀번호가 일치하지 않습니다."] },
    };
  }

  const usernameExists = await checkUsernameExists(request, {
    username: data.username,
  });
  if (usernameExists) {
    return {
      signUpError: null,
      formErrors: { username: ["이미 사용중인 이름입니다."] },
    };
  }

  // return redirect(`/users/${data.username}/welcome`);
  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email, 
    password: data.password,
    options: {
      data: {
        username: data.username,
      }
    }
  });
  if (signUpError) {
    return {
      signUpError: signUpError.message,
      formErrors: null,
    }
  };

  // send e-mail
  // return redirect("/", { headers });
  return redirect(`/users/${data.username}/welcome/${data.email}`, { headers });
}

export default function JoinPage({ loaderData, actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-lg">
        <CardHeader>
          <CardTitle>
            환영합니다.
          </CardTitle>
          <CardDescription>
            The greatest habit과 함께 목표를 세우고 좋은 습관을 만들어보세요. <br/>
            변화의 첫 걸음을 내딛는 당신을 진심으로 응원합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form className="space-y-5 p-5" method="post">
            <InputPair
              label="e-mail" 
              name="email"
              id="email"
              required
              type="email"
              placeholder="사용하실 e-mail을 입력하세요."
            />
            {actionData && "formErrors" in actionData && (
              <p className="text-sm text-red-500">{actionData?.formErrors?.email?.join(", ")}</p>
            )}

            <InputPair
              label="이름" 
              name="username"
              id="username"
              required
              type="text"
              placeholder="사용하실 이름을 입력하세요."
            />
            {actionData && "formErrors" in actionData && (
              <p className="text-sm text-red-500">{actionData?.formErrors?.username?.join(", ")}</p>
            )}

            <InputPair
              label="비밀번호" 
              name="password"
              id="password"
              required
              type="password"
              placeholder="비밀번호를 입력하세요."
            />
            {actionData && "formErrors" in actionData && (
              <p className="text-sm text-red-500">{actionData?.formErrors?.password?.join(", ")}</p>
            )}

            <InputPair
              label="비밀번호 확인" 
              name="password_confirm"
              id="password_confirm"
              required
              type="password"
              placeholder="비밀번호를 한번 더 입력하세요."
            />
            {actionData && "formErrors" in actionData && (
              <p className="text-sm text-red-500">{actionData?.formErrors?.password_confirm?.join(", ")}</p>
            )}

            <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? ( 
              <LoaderCircle className="animate-spin" />
            ) : (
              "회원가입"
            )}
            </Button> 
            {actionData && "loginError" in actionData && (
              <p className="text-sm text-red-500">{actionData.signUpError}</p>
            )}

            <Button variant={"secondary"} className="w-full" asChild>
              <Link to="/auth/sign-in" className="text-sm">이미 계정이 있으신가요?</Link>
            </Button> 
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center items-center text-xs text-muted-foreground">
          {loaderData.sentence}
        </CardFooter>
      </Card>
    </div>
  );
}