import { Form, Link, redirect, useNavigation, type MetaFunction } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { SENTENCES } from "~/common/sentences";
import { getRandomInt } from "~/lib/utils";
import type { Route } from "./+types/sign-in-page";
import { AlertCircleIcon, LoaderCircle, Terminal } from "lucide-react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";

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
  password: z.string().min(8, {
    message: "최소 8글자 이상의 비밀번호를 입력해주세요.",
  }),
});

export const loader = () => {
  const randIndex = getRandomInt(0, SENTENCES.length - 1);
  const sentence = SENTENCES[randIndex];
  return { sentence };
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData)); 
  if (!success) {
    return {
      loginError: null,
      formErrors: error.flatten().fieldErrors
    };
  }

  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: signInError } = await client.auth.signInWithPassword({
    email, 
    password,
  });
  if (signInError) {
    return {
      loginError: signInError.message,
      formErrors: null,
    };
  }

  return redirect("/", { headers });
}

export default function SignInPage({ loaderData, actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-lg">
        <CardHeader>
          <CardTitle>
            돌아오신 것을 환영합니다.
          </CardTitle>
          <CardDescription>
            The greatest habit과 함께 목표를 이루고 좋은 습관을 완성하세요. <br/>
            당신의 도전을 응원합니다.
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
              placeholder="e-mail을 입력하세요."
            />
            {actionData && "formErrors" in actionData && (
              <p className="text-sm text-red-500">{actionData?.formErrors?.email?.join(", ")}</p>
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

            <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? ( 
              <LoaderCircle className="animate-spin" />
            ) : (
              "입장하기"
            )}
            </Button> 
            {actionData && "loginError" in actionData && (
              <p className="text-sm text-red-500">{actionData.loginError}</p>
            )}

            <Button variant={"secondary"} className="w-full" asChild>
              <Link to="/auth/join" className="text-sm">처음 오셨나요?</Link>
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