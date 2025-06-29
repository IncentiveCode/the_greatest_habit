import { Form, Link, type MetaFunction } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { SENTENCES } from "~/common/sentences";
import { getRandomInt } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "The greatest habit" },
    { name: "description", content: "Welcome to the greatest habit!" },
  ];
}

export default function SignInPage() {
  const randIndex = getRandomInt(0, SENTENCES.length - 1);
  const sentence = SENTENCES[randIndex];

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
          <Form className="space-y-5 p-5">
            <InputPair
              label="e-mail" 
              name="e-mail"
              id="e-mail"
              required
              type="email"
              placeholder="e-mail을 입력하세요."
            />

            <InputPair
              label="비밀번호" 
              name="password"
              id="password"
              required
              type="password"
              placeholder="비밀번호를 입력하세요."
            />

            <Button className="w-full">입장하기</Button> 

            <Button variant={"secondary"} className="w-full" asChild>
              <Link to="/auth/join" className="text-sm">처음 오셨나요?</Link>
            </Button> 
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center items-center text-xs text-muted-foreground">
          {sentence}
        </CardFooter>
      </Card>
    </div>
  );
}