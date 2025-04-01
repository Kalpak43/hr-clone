import { dayNames } from "@/data";
import { useCallback } from "react";

interface WeekViewProps {
  currentDate: Date;
  holidays: any;
  filter: string;
  highlightedDate: Date | null;
  openNewEventModal: (date: Date) => void;
  getEventsForDay: (date: Date) => any[];
}

export function WeekView({
  currentDate,
  holidays,
  filter,
  highlightedDate,
  openNewEventModal,
  getEventsForDay,
}: WeekViewProps) {
  const getWeekDaysArray = useCallback(() => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateISO = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      days.push({
        day: date.getDate(),
        date,
        isOutsideMonth: date.getMonth() !== currentDate.getMonth(),
        isHoliday: holidays[dateISO],
      });
    }

    return days;
  }, [currentDate, holidays]);

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const isWeekend = (date: Date) => {
    return !isWeekday(date);
  };

  const daysArray = getWeekDaysArray();

  const filteredDaysArray = daysArray.filter((dayInfo: any) => {
    if (
      filter === "weekdays" &&
      dayInfo.date &&
      dayInfo.isOutsideMonth === false
    ) {
      return isWeekday(dayInfo.date);
    }
    if (
      filter === "weekends" &&
      dayInfo.date &&
      dayInfo.isOutsideMonth === false
    ) {
      return isWeekend(dayInfo.date);
    }
    return true;
  });

  return (
    <div className="overflow-y-auto grid grid-cols-7 gap-1 h-full">
      {filteredDaysArray.map((dayInfo, index) => (
        <WeekDayCell
          key={index}
          dayInfo={dayInfo}
          highlightedDate={highlightedDate}
          openNewEventModal={openNewEventModal}
          getEventsForDay={getEventsForDay}
        />
      ))}
    </div>
  );
}

function WeekDayCell({
  dayInfo,
  highlightedDate,
  openNewEventModal,
  getEventsForDay,
}: {
  dayInfo: any;
  highlightedDate: Date | null;
  openNewEventModal: (date: Date) => void;
  getEventsForDay: (date: Date) => any[];
}) {
  return (
    <div
      className={`relative rounded-md border p-2 min-h-48 ${
        dayInfo.isOutsideMonth ? "bg-gray-100 text-gray-600" : "text-gray-700"
      } ${
        dayInfo.date &&
        new Date().toDateString() === dayInfo.date.toDateString()
          ? "border-2 border-blue-400 bg-blue-100"
          : ""
      } ${
        highlightedDate &&
        dayInfo.date &&
        highlightedDate.toDateString() === dayInfo.date.toDateString()
          ? " bg-blue-50 "
          : ""
      } ${
        dayInfo.date.getDay() === 0 || dayInfo.date.getDay() === 6
          ? "bg-red-50 text-red-500"
          : ""
      } cursor-pointer hover:bg-gray-50 transition-colors duration-150`}
      onClick={() => openNewEventModal(dayInfo.date)}
    >
      <div className="flex flex-col items-center mb-2 pb-1 border-b">
        <div className="text-xs font-medium">
          {dayNames[dayInfo.date.getDay()].substring(0, 3)}
        </div>
        <div className="text-lg font-bold">{dayInfo.day}</div>
      </div>
      {dayInfo.isHoliday && (
        <div className="text-xs text-red-500 bg-red-50 rounded-sm py-0.5 px-1 mb-1">
          {dayInfo.isHoliday}
        </div>
      )}
      <div className="mt-1 overflow-hidden">
        {getEventsForDay(dayInfo.date).map((event) => (
          <div
            key={event.id}
            className="bg-blue-100 text-blue-700 text-xs rounded-sm py-1 px-2 mb-1 truncate"
            title={event.title}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}
