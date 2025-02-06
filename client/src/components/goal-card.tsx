import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Goal } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "@shared/schema";

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const { data: tasks } = useQuery<Task[]>({
    queryKey: [`/api/goals/${goal.id}/tasks`],
  });

  const completedTasks = tasks?.filter((t) => t.completed).length || 0;
  const totalTasks = tasks?.length || 0;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Link href={`/goals/${goal.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{goal.title}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {goal.category}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {goal.description}
          </p>
          <Progress value={progress} className="h-2" />
          <div className="mt-2 text-sm text-muted-foreground">
            {completedTasks} of {totalTasks} tasks completed
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
