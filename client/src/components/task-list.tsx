import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface TaskListProps {
  goalId: number;
  tasks: Task[];
}

export default function TaskList({ goalId, tasks }: TaskListProps) {
  const mutation = useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
      const res = await apiRequest("PATCH", `/api/tasks/${id}`, { completed });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/goals/${goalId}/tasks`] });
    },
  });

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) =>
              mutation.mutate({ id: task.id, completed: !!checked })
            }
          />
          <span
            className={`text-sm ${
              task.completed ? "text-muted-foreground line-through" : ""
            }`}
          >
            {task.description}
          </span>
        </div>
      ))}
    </div>
  );
}
