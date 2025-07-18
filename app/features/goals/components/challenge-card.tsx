import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

interface ChallengeCardProps {
  id: number;
  name: string;
  description: string;
  participantCount: number;
}

export function ChallengeCard({ id, name, description, participantCount }: ChallengeCardProps) {
  return (
    <Card className="w-75">
      <CardHeader>
        <CardDescription className="w-full text-xs">Challenge</CardDescription>
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        <p className="text-muted-foreground text-xs">
          현재 {participantCount} 명이 함께 도전하고 있어요.
        </p>
        <Button asChild>
          <Link to={`/challenges/${id}/join`}>지금 참여하기 &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 