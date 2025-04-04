import { projects } from "@/data";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
function ProjectStatus() {
  // Calculate project counts by status
  const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Define colors for different statuses
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "hsl(142, 76%, 36%)"; // Green
      case "In Progress":
        return "hsl(217, 91%, 60%)"; // Blue
      case "Planning":
        return "hsl(271, 91%, 65%)"; // Purple
      case "Not Started":
        return "hsl(0, 84%, 60%)"; // Red
      default:
        return "hsl(220, 14%, 75%)"; // Gray
    }
  };

  // Custom renderer for the legend
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <ul className="flex flex-wrap justify-center gap-4 pt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 col-span-2">
      <div className="flex items-center justify-between">
        <p className="">Projects by Status</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getStatusColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} projects`, "Count"]}
              contentStyle={{
                borderRadius: "0.375rem",
              }}
            />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProjectStatus;
