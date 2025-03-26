import { CartesianGrid, Cell, Label, Pie, PieChart, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, XAxis } from "recharts";

const data = [
  { name: "Software Development", value: 450000 },
  { name: "Business Development", value: 320000 },
  { name: "Human Resources", value: 180000 },
  { name: "Account Department", value: 250000 },
];

const locationData = [{ name: "Hyderabad", value: 2000000 }];

// Configuration for the chart
const chartConfig = {
  "Software Development": {
    label: "Software Development",
    color: "var(--chart-1)",
  },
  "Business Development": {
    label: "Business Development",
    color: "var(--chart-2)",
  },
  "Human Resources": {
    label: "Human Resources",
    color: "var(--chart-3)",
  },
  "Account Department": {
    label: "Account Department",
    color: "var(--chart-4)",
  },
};

const locationChartConfig = {
  Hyderabad: {
    label: "Hyderabad",
    color: "var(--chart-1)",
  },
};

function PayrollPage() {
  return (
    <main className="hero">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
          <div className="flex items-center justify-between">
            <p className="">Last Salary Processed</p>
            <p className="text-xs text-gray-500">JUL 2023</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-[600] text-black">INR 9,97, 423</p>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
          <div className="flex items-center justify-between">
            <p className="">Upcoming Salary</p>
            <p className="text-xs text-gray-500">AUG 2023</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-[600] text-black">INR 9,11, 588</p>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
          <div className="flex items-center justify-between">
            <p className="">Upcoming Revisions</p>
            <p className="text-xs text-gray-500">JUL 2023</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-[600] text-black">0</p>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
          <div className="flex items-center justify-between">
            <p className="">Pending Revisions</p>
            <p className="text-xs text-gray-500">JUL 2023</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-[600] text-black">0</p>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
          <div className="flex items-center justify-between">
            <p className="">Compensation Distribution by Department</p>
          </div>

          <DepartmentChart />
        </div>
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
          <div className="flex items-center justify-between">
            <p className="">Compensation Distribution by Location</p>
          </div>
          <LocationChart />
        </div>
      </div>
      <PlannedCompensationCard />
    </main>
  );
}

export default PayrollPage;

function DepartmentChart() {
  // Calculate total for percentage display
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage for display
  const formatPercentage = (value: number) => {
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <ChartContainer config={chartConfig} className="">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              labelLine={false}
            >
              {data.map((entry) => {
                return (
                  <Cell
                    key={entry.name}
                    fill={`${
                      chartConfig[entry.name as keyof typeof chartConfig].color
                    }`}
                    stroke="transparent"
                  />
                );
              })}
            </Pie>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  //@ts-ignore
                  content={(props) => {
                    const { payload } = props;
                    if (payload && payload.length) {
                      const data = payload[0].payload;

                      return (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  chartConfig[
                                    data.name as keyof typeof chartConfig
                                  ].color,
                              }}
                            />
                            <span className="font-medium">{data.name}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-muted-foreground">
                              Amount:
                            </div>
                            <div className="text-sm font-medium">
                              {formatCurrency(data.value)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Percentage:
                            </div>
                            <div className="text-sm font-medium">
                              {formatPercentage(data.value)}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              }
            />
          </PieChart>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-xs"
                style={{
                  backgroundColor:
                    chartConfig[item.name as keyof typeof chartConfig].color,
                }}
              />
              <span className="">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <p className="uppercase">TOTAL COMPENSATION</p>
          <p className="font-[600]">INR 1,11,82,548</p>
        </div>
        <div>
          <p className="uppercase">HIGHEST COMPENSATION</p>
          <p className="font-[600] text-xs">Software Development</p>
          <p className="font-[600]">(INR 1,11,82,548)</p>
        </div>
        <div>
          <p className="uppercase">LOWEST COMPENSATION</p>
          <p className="font-[600] text-xs">Account Department</p>
          <p className="font-[600]">(INR 1,73,548)</p>
        </div>
      </div>
    </div>
  );
}

function LocationChart() {
  // Calculate total for percentage display
  const total = locationData.reduce((sum, item) => sum + item.value, 0);

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage for display
  const formatPercentage = (value: number) => {
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <ChartContainer config={locationChartConfig} className="">
          <PieChart>
            <Pie
              data={locationData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              labelLine={false}
            >
              {locationData.map((entry) => {
                return (
                  <Cell
                    key={entry.name}
                    fill={`${
                      locationChartConfig[
                        entry.name as keyof typeof locationChartConfig
                      ].color
                    }`}
                    stroke="transparent"
                  />
                );
              })}
            </Pie>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  //@ts-ignore
                  content={(props) => {
                    const { payload } = props;
                    if (payload && payload.length) {
                      const data = payload[0].payload;

                      return (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  locationChartConfig[
                                    data.name as keyof typeof locationChartConfig
                                  ].color,
                              }}
                            />
                            <span className="font-medium">{data.name}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-muted-foreground">
                              Amount:
                            </div>
                            <div className="text-sm font-medium">
                              {formatCurrency(data.value)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Percentage:
                            </div>
                            <div className="text-sm font-medium">
                              {formatPercentage(data.value)}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              }
            />
          </PieChart>
        </ChartContainer>

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
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <p className="uppercase">TOTAL COMPENSATION</p>
          <p className="font-[600]">INR 1,11,82,548</p>
        </div>
        <div>
          <p className="uppercase">HIGHEST COMPENSATION</p>
          <p className="font-[600] text-xs">Software Development</p>
          <p className="font-[600]">(INR 1,11,82,548)</p>
        </div>
        <div>
          <p className="uppercase">LOWEST COMPENSATION</p>
          <p className="font-[600] text-xs">Account Department</p>
          <p className="font-[600]">(INR 1,73,548)</p>
        </div>
      </div>
    </div>
  );
}

const compensationData = [
  {
    month: "January",
    planned_compensation: 5200,
    actual_compensation: 4800,
    variance: -200,
  },
  {
    month: "February",
    planned_compensation: 5000,
    actual_compensation: 4000,
    variance: 100,
  },
  {
    month: "March",
    planned_compensation: 5500,
    actual_compensation: 5400,
    variance: -100,
  },
  {
    month: "April",
    planned_compensation: 5800,
    actual_compensation: 5900,
    variance: 100,
  },
  {
    month: "May",
    planned_compensation: 6000,
    actual_compensation: 6100,
    variance: 100,
  },
  {
    month: "June",
    planned_compensation: 6200,
    actual_compensation: 6100,
    variance: -100,
  },
  {
    month: "July",
    planned_compensation: 6500,
    actual_compensation: 6400,
    variance: -100,
  },
  {
    month: "August",
    planned_compensation: 6700,
    actual_compensation: 6800,
    variance: 100,
  },
  {
    month: "September",
    planned_compensation: 7000,
    actual_compensation: 6900,
    variance: -100,
  },
  {
    month: "October",
    planned_compensation: 7200,
    actual_compensation: 7300,
    variance: 100,
  },
  {
    month: "November",
    planned_compensation: 7500,
    actual_compensation: 7600,
    variance: 100,
  },
  {
    month: "December",
    planned_compensation: 8000,
    actual_compensation: 7900,
    variance: -100,
  },
];

const compChartConfig = {
  planned_compensation: {
    label: "Planned Compensation",
    color: "hsl(var(--chart-1))",
  },
  actual_compensation: {
    label: "Actual Compensation",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function PlannedCompensationCard() {
  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
      <div className="flex items-center justify-between">
        <p className="">
          Planned Vs Actual Compensation (Variance) - Past Months
        </p>
      </div>
      <div>
        <ChartContainer config={compChartConfig} className="">
          <BarChart accessibilityLayer data={compensationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
            >
              <Label
                value="Months"
                // offset={10} // Distance from the axis
                position="bottom" // Position of the label (top, bottom, left, right)
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fill: "var(--axis-title-color)", // Customize color
                  textTransform: "uppercase", // Customize text
                }}
              />
            </XAxis>
            <YAxis axisLine={true} tickLine={true} tickMargin={10} />

            <Bar
              dataKey="planned_compensation"
              stackId="a"
              fill="var(--chart-2)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="actual_compensation"
              stackId="b"
              fill="var(--chart-1)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
