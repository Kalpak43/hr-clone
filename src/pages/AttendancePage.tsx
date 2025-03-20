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
import AttendanceLog from "@/components/AttendanceLog";

function AttendancePage() {
  return (
    <div className="hero h-full relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

  // Dummy start and end times for each day
  const schedule = {
    0: { start: 9, end: 18 }, // Monday
    1: { start: 10, end: 19 }, // Tuesday
    2: { start: 8, end: 17 }, // Wednesday
    3: { start: 9, end: 18 }, // Thursday
    4: { start: 10, end: 19 }, // Friday
    5: "Day Off", // Saturday
    6: "Day Off", // Sunday
  };

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour} ${period}`;
  };

  // @ts-ignore
  const currentSchedule = schedule[currSelected] || { start: 9, end: 18 };
  const isDayOff = typeof currentSchedule === "string";

  return (
    <div className="border border-gray-300 rounded-md p-4 space-y-8 flex flex-col">
      <div className="flex max-md:flex-col max-md:items-start gap-2 items-start justify-between">
        <p className="py-2">
          Timings
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </p>
      </div>

      <div className="flex flex-col flex-1 h-full justify-between max-md:gap-8">
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
          {/* Timeline */}
          <div className="relative w-full h-10">
            {isDayOff ? (
              <div className="text-center text-gray-500 text-lg">Day Off</div>
            ) : (
              <>
                <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-full bg-blue-400 rounded-full"
                    style={{
                      left: `${(currentSchedule.start / 24) * 100}%`,
                      width: `${((currentSchedule.end - currentSchedule.start) / 24) * 100}%`,
                    }}
                  />
                </div>

                <div className="absolute top-2 left-0 right-0 flex justify-between text-xs text-gray-500">
                  {[0, 6, 12, 18, 24].map((hour) => (
                    <div key={hour} className="flex flex-col items-center">
                      <span>{hour === 24 ? "12 AM" : formatTime(hour)}</span>
                    </div>
                  ))}
                </div>

                <div className="absolute top-[-20px] text-xs text-blue-500 font-medium">
                  {`${formatTime(currentSchedule.start)} - ${formatTime(
                    currentSchedule.end
                  )}`}
                </div>

                <div className="absolute top-8 left-0 right-0 flex justify-between text-xs text-gray-500">
                  <div className="">
                    Duration: {currentSchedule.end - currentSchedule.start}h 0m
                  </div>
                  <div className="">
                    <Coffee className="inline mr-2 -mt-1" size={16} />
                    <span>60 min</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActionsCard() {
  const [clockedIn, setClockedIn] = useState(false);

  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("0h 00m 00s");

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (clockedIn && clockInTime) {
      timerInterval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - clockInTime.getTime()) / 1000);
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setElapsedTime(
          `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
            2,
            "0"
          )}m ${String(seconds).padStart(2, "0")}s`
        );
      }, 1000);
    } else {
      setElapsedTime("0h 00m 00s");
    }

    return () => clearInterval(timerInterval);
  }, [clockedIn, clockInTime]);

  const handleClockInOut = () => {
    if (!clockedIn) {
      setClockInTime(new Date());
    }
    setClockedIn((prev) => !prev);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 pb-2">
          <div className="max-md:text-center">
            {clockedIn ? (
              <h4 className="text-2xl font-[500]">{elapsedTime}</h4>
            ) : (
              <>
                <h4 className="text-2xl font-[500]">
                  {formattedTime}{" "}
                  <span className="text-sm uppercase">{period}</span>
                </h4>
              </>
            )}
            <p className="text-xs text-gray-500">{new Date().toDateString()}</p>
          </div>
          <div className="w-full">
            <Button
              onClick={handleClockInOut}
              className={`cursor-pointer w-full ${
                clockedIn
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {clockedIn ? "Remote Clock-out" : "Remote Clock-in"}
            </Button>
            <p className="text-xs text-gray-500 leading-loose">
              0h 00m since last log in
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
  const [month, setMonth] = useState(2);

  return (
    <div className="md:col-span-3 border border-gray-300 rounded-md p-4 space-y-8 flex flex-col">
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
        {activeTab == 0 && (
          <div className="flex divide-x divide-gray-300 border border-gray-300 rounded">
            <button
              className={`px-4 py-1 cursor-pointer uppercase ${
                month === 2 && "bg-gray-300"
              }`}
              onClick={() => setMonth(2)}
            >
              Current
            </button>

            <button
              className={`px-4 py-1 cursor-pointer ${
                month === 0 && "bg-gray-300"
              }`}
              onClick={() => setMonth(0)}
            >
              JAN
            </button>
            <button
              className={`px-4 py-1 cursor-pointer ${
                month === 1 && "bg-gray-300"
              }`}
              onClick={() => setMonth(1)}
            >
              FEB
            </button>
          </div>
        )}
      </div>

      <div>
        {activeTab === 0 && <AttendanceLog month={month} />}
        {activeTab === 1 && (
          <SCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-full"
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
