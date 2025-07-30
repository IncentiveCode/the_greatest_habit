import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

interface HabitCardProps {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export function HabitCard({ id, name, description, startDate, endDate }: HabitCardProps) {
  return (
    <Card className="w-full bg-primary text-white">
      <CardHeader>
        <CardDescription className="w-full text-xs text-accent">Habit</CardDescription>
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        <p className="text-accent text-xs">
          {startDate} ~ {endDate}
        </p>
        <Button variant={"outline"} asChild>
          <Link to={`/habits/${id}`}>상세 정보 확인 &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 