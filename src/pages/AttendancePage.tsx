import DateRangeDropdown from "@/components/DateRangeDropdown";
import { Coffee, Info, User, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

function AttendancePage() {
  return (
    <div className="hero h-full relative">
      <div className="grid grid-cols-3 gap-4">
        <AttendanceStats />
        <WeeklyCard />
      </div>
    </div>
  );
}

export default AttendancePage;

export function AttendanceStats() {
  return (
    <div className="border border-gray-300 rounded-md p-4 space-y-4">
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
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Define the highlighted time range (10am - 7pm)
  const highlightStart = 10;
  const highlightEnd = 19; // 7pm in 24-hour format

  return (
    <div className="border border-gray-300 rounded-md p-4 space-y-6 flex flex-col">
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
