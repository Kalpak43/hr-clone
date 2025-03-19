import DateRangeDropdown from "@/components/DateRangeDropdown";
import {
  Building2,
  Calendar,
  ClockFading,
  Coffee,
  FileText,
  Home,
  Info,
  Logs,
  User,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Calendar as SCalendar } from "@/components/ui/calendar";

function AttendancePage() {
  return (
    <div className="hero h-full relative">
      <div className="grid grid-cols-3 gap-4">
        <AttendanceStats />
        <WeeklyCard />
        <ActionsCard />
        <LogsCard />
      </div>
    </div>
  );
}

export default AttendancePage;

export function AttendanceStats() {
  return (
    <div className="border border-gray-300 rounded-md p-4 space-y-8">
      <div className="flex max-md:flex-col max-md:items-start gap-2 items-start justify-between">
        <p className="py-2">
          Attendance Stats{" "}
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </p>
        <div className="flex items-center gap-2">
          <DateRangeDropdown />
        </div>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className=""></TableHead>
            <TableHead className="text-xs uppercase text-gray-600">
              avg hrs / day
            </TableHead>
            <TableHead className="text-xs uppercase text-gray-600">
              on time arrival
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 aspect-sqaure rounded-full border bg-yellow-400 text-white flex items-center justify-center">
                  <User size={16} />
                </div>
                <p>Me</p>
              </div>
            </TableCell>
            <TableCell className="text-lg font-[500]">10h 25m</TableCell>
            <TableCell className="text-lg font-[500]">100%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 aspect-sqaure rounded-full border bg-pink-400 text-white flex items-center justify-center">
                  <Users size={16} />
                </div>
                <p>My Team</p>
              </div>
            </TableCell>
            <TableCell className="text-lg font-[500]">7h 15m</TableCell>
            <TableCell className="text-lg font-[500]">58%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function WeeklyCard() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const [currSelected, setCurrSelected] = useState(new Date().getDay() - 1);
  // Generate hours for the timeline
  // const hours = Array.from({ length: 24 }, (_, i) => i);

  // Define the highlighted time range (10am - 7pm)
  const highlightStart = 10;
  const highlightEnd = 19; // 7pm in 24-hour format

  return (
    <div className="border border-gray-300 rounded-md p-4 space-y-8 flex flex-col">
      <div className="flex max-md:flex-col max-md:items-start gap-2 items-start justify-between">
        <p className="py-2">
          Timings{" "}
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </p>
      </div>

      <div className="flex flex-col flex-1 h-full justify-between">
        <div className="flex gap-2">
          {days.map((day, i) => (
            <button
              key={i}
              className={`h-8 w-8 rounded-full border cursor-pointer hover:bg-gray-100 ${
                i === currSelected && "bg-blue-400 text-white"
              }`}
              onClick={() => setCurrSelected(i)}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="py-2">
          {/* timeline */}
          <div className="relative w-full h-10">
            {/* Timeline container */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-full">
              {/* Highlighted section */}
              <div
                className="absolute h-full bg-blue-400 rounded-full"
                style={{
                  left: `${(highlightStart / 24) * 100}%`,
                  width: `${((highlightEnd - highlightStart) / 24) * 100}%`,
                }}
              />
            </div>

            {/* Hour markers */}
            <div className="absolute top-2 left-0 right-0 flex justify-between text-xs text-gray-500">
              {[0, 6, 12, 18, 24].map((hour) => (
                <div key={hour} className="flex flex-col items-center">
                  <span>{hour === 24 ? "24" : `${hour}`}</span>
                </div>
              ))}
            </div>

            {/* Time range label */}
            <div
              className="absolute top-[-20px] text-xs text-blue-500 font-medium"
              // style={{ left: `${(highlightStart / 24) * 100}%` }}
            >
              10am - 7pm
            </div>

            <div className="absolute top-8 left-0 right-0 flex justify-between text-xs text-gray-500">
              <div className="">Duration: 9h 0m</div>
              <div className="">
                <Coffee className="inline mr-2 -mt-1" size={16} />
                <span>60 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActionsCard() {
  const [clockedIn, setClockedIn] = useState(false);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const period = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12;

    return {
      time: `${String(formattedHours).padStart(2, "0")} : ${String(
        minutes
      ).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`,
      period,
    };
  };

  const { time: formattedTime, period } = formatTime(time);

  return (
    <div className="border border-gray-300 rounded-md p-4 space-y-8 flex flex-col">
      <div className="flex max-md:flex-col max-md:items-start gap-2 items-start justify-between">
        <p className="py-2">
          Actions{" "}
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </p>
      </div>
      <div className="space-y-2 flex-1 h-full flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-2 pb-2">
          <div className="">
            <h4 className="text-2xl font-[500]">
              {formattedTime}{" "}
              <span className="text-sm uppercase">{period}</span>
            </h4>
            <p className="text-xs text-gray-500">{new Date().toDateString()}</p>
          </div>
          <div className="w-full">
            <Button
              onClick={() => setClockedIn((x) => !x)}
              className={`cursor-pointer w-full ${
                clockedIn
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {clockedIn ? "Remote Clock-out" : "Remote Clock-in"}
            </Button>
            <p className="text-xs text-gray-500 leading-loose">
              0h 00m since last login
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-blue-400">
          <Link to={"/"}>
            <Home size={14} className="inline mr-1 -mt-1" />
            Work From Home
          </Link>
          <Link to={"/"}>
            <Building2 size={14} className="inline mr-1 -mt-1" />
            On Duty
          </Link>
          <Link to={"/"}>
            <ClockFading size={14} className="inline mr-1 -mt-1" />
            Partial Day Request
          </Link>
          <Link to={"/"}>
            <FileText size={14} className="inline mr-1 -mt-1" />
            Attendance policy
          </Link>
        </div>
      </div>
    </div>
  );
}

export function LogsCard() {
  const [activeTab, setActiveTab] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="col-span-3 border border-gray-300 rounded-md p-4 space-y-8 flex flex-col">
      <div className="flex max-md:flex-col max-md:items-start gap-2 items-start justify-between">
        <p className="py-2">
          Logs & Requests{" "}
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </p>
      </div>
      <div className="flex max-md:flex-col max-md:items-start gap-2 items-center justify-between">
        <div className="flex items-center max-md:justify-between gap-2 text-gray-700 w-full">
          <Button
            variant={activeTab === 0 ? "outline" : "ghost"}
            className={activeTab === 0 ? " bg-gray-100" : ""}
            onClick={() => setActiveTab(0)}
          >
            <Logs size={12} />
            <span>Attendance Logs</span>
          </Button>
          <Button
            variant={activeTab === 1 ? "outline" : "ghost"}
            onClick={() => setActiveTab(1)}
            className={activeTab === 1 ? " bg-gray-100" : ""}
          >
            <Calendar size={12} />
            <span>Calendar</span>
          </Button>
        </div>
        <Button variant={"outline"} className="ml-auto">
          <span>Filter</span>
        </Button>
      </div>

      <div>
        {activeTab === 0 && (
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <h2 className="text-lg font-semibold">Attendance Logs</h2>
            <p>Here you can view all attendance records.</p>
          </div>
        )}
        {activeTab === 1 && (
          <SCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-full"
            formatters={{
              formatWeekdayName: (date) => {
                return new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                }).format(date);
              },
            }}
            modifiers={{
              weekend: (date) => {
                const day = date.getDay();
                return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
              },
            }}
            modifiersStyles={{
              weekend: {
                // backgroundColor: "rgba(239, 68, 68, 0.1)", // Light red background for weekends
                fontWeight: "bold",
                color: "rgb(239, 68, 68)", // Red text for weekends
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
