import {
  CartesianGrid,
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, XAxis } from "recharts";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  data,
  locationData,
  compensationData,
  softwareDevelopmentCompensationData,
  businessDevelopmentCompensationData,
  humanResourcesCompensationData,
  accountsDepartmentCompensationData,
  salaryData,
} from "@/data";

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
  "Accounts Department": {
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
      <EmloyeeSalaryChart />
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
          <p className="font-[600] text-xs">Hyderabad</p>
          <p className="font-[600]">(INR 1,11,82,548)</p>
        </div>
        <div>
          <p className="uppercase">LOWEST COMPENSATION</p>
          <p className="font-[600] text-xs">Hyderabad</p>
          <p className="font-[600]">(INR 1,11,82,548)</p>
        </div>
      </div>
    </div>
  );
}

const compChartConfig = {
  planned_compensation: {
    label: "Planned Compensation",
    color: "var(--chart-1)",
  },
  actual_compensation: {
    label: "Actual Compensation",
    color: "var(--chart-2)",
  },
};

function PlannedCompensationCard() {
  const chartDict = {
    all: compensationData,
    "software development": softwareDevelopmentCompensationData,
    "business development": businessDevelopmentCompensationData,
    "human resources": humanResourcesCompensationData,
    "accounts department": accountsDepartmentCompensationData,
  };
  const [selectedItem, setSelectedItem] = useState<
    | "all"
    | "software development"
    | "business development"
    | "human resources"
    | "accounts department"
  >("all");

  const handleSelect = (
    item:
      | "all"
      | "software development"
      | "business development"
      | "human resources"
      | "accounts department"
  ) => {
    setSelectedItem(item);
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
      <div className="flex items-center justify-between">
        <p className="">
          Planned Vs Actual Compensation (Variance) - Past Months
        </p>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-[220px]" size="sm">
            <SelectValue placeholder="All" defaultValue={"all"} />
          </SelectTrigger>
          <SelectContent className="text-black">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="software development">
              Software Development
            </SelectItem>
            <SelectItem value="business development">
              Business Development
            </SelectItem>
            <SelectItem value="human resources">Human Resource</SelectItem>
            <SelectItem value="accounts department">
              Accounts Department
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <ChartContainer config={compChartConfig} className="">
          <BarChart
            accessibilityLayer
            data={chartDict[selectedItem]}
            margin={{ top: 20, right: 30, left: 40, bottom: 30 }}
            height={600}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
            />
            <YAxis axisLine={true} tickLine={true} tickMargin={10}>
              <Label
                value="Amount"
                // offset={10} // Distance from the axis
                position="left" // Position of the label (top, bottom, left, right)
                angle={-90}
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fill: "var(--axis-title-color)", // Customize color
                  textTransform: "uppercase", // Customize text
                }}
              />
            </YAxis>

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

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-xs"
              style={{
                backgroundColor: compChartConfig["actual_compensation"].color,
              }}
            />
            <span className="">Planned Compensation</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-xs"
              style={{
                backgroundColor: compChartConfig["planned_compensation"].color,
              }}
            />
            <span className="">Actual Compensation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Transform data for the selected year
const transformDataForYear = (year: string) => {
  const yearData = salaryData.find((data) => data.year === year);
  return yearData?.salaryRanges || [];
};

// Compare all years for a specific range
const transformDataForAllYears = () => {
  const ranges = ["0-5 LPA", "5-10 LPA", "10-15 LPA", "15-20 LPA", "20+ LPA"];

  return ranges.map((range) => {
    const data = { range };
    salaryData.forEach((yearData) => {
      const rangeData = yearData.salaryRanges.find((r) => r.range === range);
      // @ts-ignore
      data[yearData.year] = rangeData?.employees || 0;
    });
    return data;
  });
};
function EmloyeeSalaryChart() {
  const [viewMode, setViewMode] = useState<"byYear" | "compareYears">("byYear");
  const [selectedYear, setSelectedYear] = useState(salaryData[3].year);

  const chartConfig =
    viewMode === "byYear"
      ? {
          employees: {
            label: "Employees",
            color: "var(--chart-1)",
          },
        }
      : {
          [salaryData[0].year.replace("-", "")]: {
            label: salaryData[0].year,
            color: "var(--chart-1)",
          },
          [salaryData[1].year.replace("-", "")]: {
            label: salaryData[1].year,
            color: "var(--chart-2)",
          },
          [salaryData[2].year.replace("-", "")]: {
            label: salaryData[2].year,
            color: "var(--chart-3)",
          },
          [salaryData[3].year.replace("-", "")]: {
            label: salaryData[3].year,
            color: "var(--chart-4)",
          },
        };

  // Data to display based on view mode
  const chartData =
    viewMode === "byYear"
      ? transformDataForYear(selectedYear)
      : transformDataForAllYears();

  // Data keys for the bars
  const dataKeys =
    viewMode === "byYear" ? ["employees"] : salaryData.map((d) => d.year);

  // console.log(chartData);
  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
      <div className="flex items-center justify-between">
        <p className="">Employees by salary range (Last 4 years)</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={viewMode}
            onValueChange={(value) =>
              setViewMode(value as "byYear" | "compareYears")
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="byYear">By Year</SelectItem>
              <SelectItem value="compareYears">Compare Years</SelectItem>
            </SelectContent>
          </Select>

          {viewMode === "byYear" && (
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {salaryData.map((data) => (
                  <SelectItem key={data.year} value={data.year}>
                    {data.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div>
        <ChartContainer config={chartConfig} className="h-[500px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            className="w-full"
            margin={{
              left: 50,
              right: 20,
              top: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={true}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis
              dataKey="range"
              type="category"
              tickLine={false}
              axisLine={true}
            />
            <Legend />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {dataKeys.map((key) => {
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={`var(--color-${key.replace("-", "")}`}
                  radius={[0, 4, 4, 0]}
                />
              );
            })}
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
