import { projects } from "@/data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CompletionProgress() {
  // Sort projects by progress for better visualization
  const sortedProjects = [...projects].sort((a, b) => a.progress - b.progress);

  // Prepare data for the chart
  const chartData = sortedProjects.map((project) => ({
    name: project.name,
    progress: project.progress,
  }));

  // Colors for different progress levels
  const getBarColor = (progress: number) => {
    if (progress === 100) return "hsl(142, 76%, 36%)"; // Green for completed
    if (progress >= 60) return "hsl(217, 91%, 60%)"; // Blue for good progress
    if (progress >= 30) return "hsl(38, 92%, 50%)"; // Amber for medium progress
    return "hsl(0, 84%, 60%)"; // Red for low progress
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold">Project Progress</p>
      </div>
      {/* <LocationChart /> */}

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 50, bottom: 40, left: 10 }}
          >
            <CartesianGrid horizontal stroke="#f5f5f5" vertical={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickCount={6}
              unit="%"
              label={{
                value: "Progress (%)",
                position: "insideBottom",
                offset: -25,
              }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={150}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Progress"]}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Bar
              dataKey="progress"
              radius={4}
              barSize={30}
              background={{ fill: "#f5f5f5" }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.progress)}
                />
              ))}
              <LabelList
                dataKey="progress"
                position="right"
                formatter={(value: number) => `${value}%`}
                style={{ fill: "#000", fontSize: 12, fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {/* 
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {locationData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-xs"
                        style={{
                          backgroundColor:
                            locationChartConfig[
                              item.name as keyof typeof locationChartConfig
                            ].color,
                        }}
                      />
                      <span className="">{item.name}</span>
                    </div>
                  ))}
                </div> */}
      </div>
    </div>
  );
}

export default CompletionProgress;
