import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import TaskList from "@/components/task-list";
import ProgressChart from "@/components/progress-chart";
import type { Goal, Task } from "@shared/schema";

export default function GoalDetails() {
  const { id } = useParams();
  const goalId = Number(id);

  const { data: goal, isLoading: isLoadingGoal } = useQuery<Goal>({
    queryKey: [`/api/goals/${goalId}`],
  });

  const { data: tasks, isLoading: isLoadingTasks } = useQuery<Task[]>({
    queryKey: [`/api/goals/${goalId}/tasks`],
  });

  if (isLoadingGoal || isLoadingTasks) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-48 animate-pulse bg-muted rounded mb-4" />
          <div className="h-96 animate-pulse bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!goal) return <div>Goal not found</div>;

  const completedTasks = tasks?.filter((t) => t.completed).length || 0;
  const totalTasks = tasks?.length || 0;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{goal.title}</h1>
          <p className="text-muted-foreground">{goal.description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Progress</h2>
              <ProgressChart progress={progress} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Micro-Tasks</h2>
              <TaskList goalId={goal.id} tasks={tasks || []} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
