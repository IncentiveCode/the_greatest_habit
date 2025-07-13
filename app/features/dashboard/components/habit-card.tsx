import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

interface HabitCardProps {
  id: string;
  name: string;
  description: string;
}

export function HabitCard({ id, name, description }: HabitCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="w-full text-xs">Habit</CardDescription>
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        <p className="text-muted-foreground text-xs">
          습관 형성 20일차 입니다.
        </p>
        <Button asChild>
          <Link to={`/habits/${id}/details`}>상세 정보 확인 &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 