import { projects } from "@/data";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function BudgetAllocation() {
  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 col-span-3">
      <div className="flex items-center justify-between">
        <p className="">Budget Allocation by Project</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={projects}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={50}
              outerRadius={100}
              fill="#8884d8"
              dataKey="budget"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {projects.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`₹${value.toLocaleString()}`, "Budget"]}
            />
            {/* <Legend /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BudgetAllocation;
