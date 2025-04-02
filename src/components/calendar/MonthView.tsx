import { dayNames } from "@/data";
import { useCallback, useState } from "react";
import DayViewModal from "./DayViewModal";

interface MonthViewProps {
  currentDate: Date;
  holidays: any;
  filter: string;
  highlightedDate: Date | null;
  openNewEventModal: (date: Date) => void;
  getEventsForDay: (date: Date) => any[];
}

export function MonthView({
  currentDate,
  holidays,
  filter,
  highlightedDate,
  openNewEventModal,
  getEventsForDay,
}: MonthViewProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDayViewModal = (day: Date) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeDayViewModal = () => {
    setSelectedDay(null);
    setIsModalOpen(false);
  };

  const getDaysArray = useCallback(() => {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const daysFromPrevMonth = firstDay.getDay();
    const daysInCurrentMonth = lastDayOfMonth.getDate();

    // Previous Month Days
    for (let i = 0; i < daysFromPrevMonth; i++) {
      const day = prevMonthLastDay - daysFromPrevMonth + 1 + i;
      days.push({
        day,
        date: new Date(year, month - 1, day),
        isOutsideMonth: true,
      });
    }

    // Current Month Days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = new Date(year, month, i);
      const dateISO = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        i
      ).padStart(2, "0")}`;
      days.push({
        day: i,
        date,
        isOutsideMonth: false,
        isHoliday: holidays[dateISO],
      });
    }

    // Next Month Days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        date: new Date(year, month + 1, i),
        isOutsideMonth: true,
      });
    }

    return days;
  }, [year, month, holidays]);

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const isWeekend = (date: Date) => {
    return !isWeekday(date);
  };

  const daysArray = getDaysArray();

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
    <>
      <div className="grid grid-cols-7 gap-1 bg-white sticky top-0 z-10 py-1">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center font-semibold py-2 border rounded-md bg-blue-50"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="overflow-y-auto grid grid-cols-7 gap-1">
        {filteredDaysArray.map((dayInfo, index) => (
          <DayCell
            key={index}
            dayInfo={dayInfo}
            highlightedDate={highlightedDate}
            openNewEventModal={openNewEventModal}
            getEventsForDay={getEventsForDay}
            openDayViewModal={openDayViewModal}
          />
        ))}
      </div>

      <DayViewModal
        isOpen={isModalOpen}
        onClose={closeDayViewModal}
        day={selectedDay}
        events={selectedDay ? getEventsForDay(selectedDay) : []}
      />
    </>
  );
}

function DayCell({
  dayInfo,
  highlightedDate,
  getEventsForDay,
  openDayViewModal,
}: {
  dayInfo: any;
  highlightedDate: Date | null;
  openNewEventModal: (date: Date) => void;
  getEventsForDay: (date: Date) => any[];
  openDayViewModal: (date: Date) => void;
}) {
  return (
    <div
      className={`relative rounded-md border p-2 min-h-24 ${
        dayInfo.isOutsideMonth ? "bg-gray-100 text-gray-600" : "text-gray-700"
      } ${
        dayInfo.date &&
        new Date().toDateString() === dayInfo.date.toDateString() &&
        !dayInfo.isOutsideMonth
          ? "border-2 border-blue-400 bg-blue-100"
          : ""
      } ${
        highlightedDate &&
        dayInfo.date &&
        highlightedDate.toDateString() === dayInfo.date.toDateString() &&
        !dayInfo.isOutsideMonth
          ? " bg-blue-50 "
          : ""
      } ${
        !dayInfo.isOutsideMonth &&
        (dayInfo.date.getDay() === 0 || dayInfo.date.getDay() === 6)
          ? "bg-red-100 text-red-500"
          : ""
      } ${
        dayInfo.isOutsideMonth &&
        (dayInfo.date.getDay() === 0 || dayInfo.date.getDay() === 6)
          ? "bg-red-50 text-red-300"
          : ""
      } cursor-pointer hover:bg-gray-50 transition-colors duration-150`}
      // onClick={() => !dayInfo.isOutsideMonth && openNewEventModal(dayInfo.date)}
      onClick={() => openDayViewModal(dayInfo.date)}
    >
      <div className="flex justify-end text-sm">{dayInfo.day}</div>
      {dayInfo.isHoliday && (
        <div className="text-xs text-red-500 bg-red-50 rounded-sm py-0.5 px-1">
          {dayInfo.isHoliday}
        </div>
      )}
      <div className="mt-1 overflow-hidden">
        {getEventsForDay(dayInfo.date).map((event) => (
          <div
            key={event.id}
            className="bg-blue-100 text-blue-700 text-xs rounded-sm py-0.5 px-1 mb-0.5 truncate"
            title={event.title}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}
