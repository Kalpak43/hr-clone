import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheck, MapPin } from "lucide-react";

function AttendanceLog({ month }: { month: number }) {
  // Define the highlighted time range (10am - 7pm)
  const highlightStart = 10;
  const highlightEnd = 19; // 7pm in 24-hour format

  const attendanceData = [
    generateAttendanceData(0, 2025).reverse(), // January 2025
    generateAttendanceData(1, 2025).reverse(), // February 2025
    Array.from({ length: 19 }, (_, i) => {
      const dateObj = new Date(2025, 2, i + 1);
      const date = dateObj.toDateString();
      const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

      if (isWeekend) {
        return { date, isDayOff: true };
      }

      const effectiveHours = `${
        10 + Math.floor(Math.random() * 3)
      }h ${Math.floor(Math.random() * 60)}m`;
      const grossHours = `${10 + Math.floor(Math.random() * 3)}h ${Math.floor(
        Math.random() * 60
      )}m`;
      const arrivalStatus = ["On Time", "Late", "Early Departure"][
        Math.floor(Math.random() * 3)
      ];
      return {
        date,
        effectiveHours,
        grossHours,
        arrivalStatus,
        isDayOff: false,
      };
    }).reverse(),
  ];

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <Table className="text-center">
        <TableHeader>
          <TableRow className="divide-x divide-gray-300 bg-gray-100">
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Attendance Visual</TableHead>
            <TableHead className="text-center">Effective Hours</TableHead>
            <TableHead className="text-center">Gross Hours</TableHead>
            <TableHead className="text-center">Arrivals</TableHead>
            <TableHead className="text-center">Logs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-300 text-gray-600">
          {attendanceData[month].map(
            (
              { date, effectiveHours, grossHours, arrivalStatus, isDayOff },
              index
            ) => (
              <TableRow
                key={index}
                className={
                  isDayOff
                    ? "bg-red-100 text-black"
                    : "" + " divide-x divide-gray-300"
                }
              >
                <TableCell>{date}</TableCell>
                <TableCell colSpan={isDayOff ? 5 : 1}>
                  {isDayOff ? (
                    <span className="">Day Off</span>
                  ) : (
                    <div className="flex items-center gap-4 text-gray-500">
                      {/* timeline */}
                      <div className="relative w-full h-fit">
                        {/* Timeline container */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full">
                          {/* Highlighted section */}
                          <div
                            className="absolute h-full bg-blue-400 rounded-full"
                            style={{
                              left: `${(highlightStart / 24) * 100}%`,
                              width: `${
                                ((highlightEnd - highlightStart) / 24) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <MapPin size={20} />
                    </div>
                  )}
                </TableCell>
                {!isDayOff && (
                  <>
                    <TableCell>{effectiveHours}</TableCell>
                    <TableCell>{grossHours}</TableCell>
                    <TableCell>{arrivalStatus}</TableCell>
                    <TableCell>
                      <CircleCheck
                        className="text-green-400 inline"
                        size={20}
                      />
                    </TableCell>
                  </>
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AttendanceLog;

// Generate attendance data for January and February
const generateAttendanceData = (month: number, year: number) => {
  return Array.from(
    { length: new Date(year, month + 1, 0).getDate() },
    (_, i) => {
      const dateObj = new Date(year, month, i + 1);
      const date = dateObj.toDateString();
      const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

      if (isWeekend) {
        return { date, isDayOff: true };
      }

      const effectiveHours = `${
        10 + Math.floor(Math.random() * 3)
      }h ${Math.floor(Math.random() * 60)}m`;
      const grossHours = `${10 + Math.floor(Math.random() * 3)}h ${Math.floor(
        Math.random() * 60
      )}m`;
      const arrivalStatus = ["On Time", "Late", "Early Departure"][
        Math.floor(Math.random() * 3)
      ];
      return {
        date,
        effectiveHours,
        grossHours,
        arrivalStatus,
        isDayOff: false,
      };
    }
  );
};
