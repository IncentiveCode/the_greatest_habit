import { Label } from "~/common/components/ui/label";
import { Checkbox } from "~/common/components/ui/checkbox";
interface ActionCardProps {
  goal_type: string;
  goal_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  defaultChecked?: boolean;
}

export function ActionCard({ 
  goal_type, goal_id, title, description, start_date, end_date, defaultChecked = false 
}: ActionCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="bg-primary hover:bg-primary/80 
        flex flex-col items-start gap-3 rounded-lg border p-3
        has-[[aria-checked=true]]:bg-primary/30"
      >
        <div className="flex flex-col gap-2">
          <span className="w-full text-xs text-accent">Habit</span>
          <span className="text-lg font-bold">책 읽기</span>
        </div>
        <div className="flex gap-3">
          <Checkbox
            id={goal_id}
            defaultChecked={defaultChecked}
            className="data-[state=checked]:border-accent data-[state=checked]:bg-primary data-[state=checked]:text-white"
            />
          <div className="grid gap-1.5 font-normal">
            <p className="text-sm leading-none font-medium">
              {title}
            </p>
            <p className="text-white text-sm">
              {description}
            </p>
          </div>
        </div>
      </Label>
    </div>
  );
} 