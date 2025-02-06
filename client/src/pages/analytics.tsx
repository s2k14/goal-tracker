import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Goal, Task } from "@shared/schema";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { goalCategories } from "@shared/schema";

export default function Analytics() {
  const { data: goals, isLoading: isLoadingGoals } = useQuery<Goal[]>({
    queryKey: ["/api/goals"],
  });

  // Calculate overall statistics
  const totalGoals = goals?.length || 0;
  const completedGoals = goals?.filter(g => g.completed).length || 0;
  const overallProgress = totalGoals ? (completedGoals / totalGoals) * 100 : 0;

  // Category distribution data
  const categoryData = goalCategories.map(category => ({
    name: category,
    value: goals?.filter(g => g.category === category).length || 0
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (isLoadingGoals) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="h-48 animate-pulse bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Progress Analytics</h1>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Overall Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Progress value={overallProgress} className="h-4 mb-2" />
              <p className="text-center text-sm text-muted-foreground">
                {completedGoals} of {totalGoals} goals completed
              </p>
            </CardContent>
          </Card>

          {/* Category Distribution Card */}
          <Card>
            <CardHeader>
              <CardTitle>Goals by Category</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
