import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertGoalSchema, goalCategories, type InsertGoal } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AddGoal() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertGoal>({
    resolver: zodResolver(insertGoalSchema.extend({
      targetDate: insertGoalSchema.shape.targetDate.transform((date) => {
        if (typeof date === 'string') {
          return new Date(date).toISOString();
        }
        return date.toISOString();
      }),
    })),
    defaultValues: {
      title: "",
      description: "",
      category: "Personal",
      targetDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD for input[type="date"]
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertGoal) => {
      const res = await apiRequest("POST", "/api/goals", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Goal created",
        description: "Your new goal has been created successfully.",
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertGoal) => {
    console.log('Submitting goal:', data); // Add logging
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Goal</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Goal Title</label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="What's your goal?"
                  className="text-lg"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Describe your goal in detail..."
                  className="min-h-[100px]"
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select
                  onValueChange={(value) => form.setValue("category", value)}
                  defaultValue={form.getValues("category")}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="targetDate" className="text-sm font-medium">Target Date</label>
                <Input
                  id="targetDate"
                  type="date"
                  {...form.register("targetDate")}
                  className="w-full"
                />
                {form.formState.errors.targetDate && (
                  <p className="text-sm text-red-500">{form.formState.errors.targetDate.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Creating..." : "Create Goal"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}