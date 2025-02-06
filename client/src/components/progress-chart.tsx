import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

interface ProgressChartProps {
  progress: number;
}

export default function ProgressChart({ progress }: ProgressChartProps) {
  const data = [
    {
      name: "Progress",
      value: progress,
      fill: "hsl(var(--primary))",
    },
  ];

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="60%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            minAngle={15}
            background={{ fill: "hsl(var(--muted))" }}
            dataKey="value"
            cornerRadius={30}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center mt-2">
        <span className="text-2xl font-bold">{Math.round(progress)}%</span>
        <span className="text-muted-foreground ml-1">complete</span>
      </div>
    </div>
  );
}
