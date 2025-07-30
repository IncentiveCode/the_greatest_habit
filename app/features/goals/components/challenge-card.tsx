import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

interface ChallengeCardProps {
  id: number;
  name: string;
  description: string;
  participantCount: number;
}

/*
 참여하기 버튼의 원본
  <Button variant={"outline"} asChild disabled>
    <Link to={`/challenges/${id}/join`}>지금 참여하기 &rarr;</Link>
  </Button>
 */


export function ChallengeCard({ id, name, description, participantCount }: ChallengeCardProps) {
  return (
    <Card className="w-75 bg-primary text-white">
      <CardHeader>
        <CardDescription className="w-full text-xs text-accent">Challenge</CardDescription>
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <p className="leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        <p className="text-accent text-xs">
          현재 {participantCount} 명이 함께 도전하고 있어요.
        </p>
        <Button variant={"outline"} disabled>
          챌린지에 참여하기 &rarr;
        </Button>
      </CardFooter>
    </Card>
  );
} 