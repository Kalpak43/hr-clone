import { dayNames } from "@/data";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DayViewModal from "./DayViewModal";

interface WeekViewProps {
  currentDate: Date;
  holidays: any;
  filter: string;
  highlightedDate: Date | null;
  openNewEventModal: (date: Date) => void;
  getEventsForDay: (date: Date) => any[];
  addNewEvent: (eventData: {
    date: string;
    title: string;
    startTime: string;
    endTime: string;
  }) => void;
}

export function WeekView({
  currentDate,
  holidays,
  filter,
  openNewEventModal,
  getEventsForDay,
  addNewEvent,
}: WeekViewProps) {
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

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const nineAMPosition = 9 * 64; // 9 AM (9 * 64px per hour)
      scrollContainerRef.current.scrollTop = nineAMPosition;
    }
  }, []);

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

  // Generate time slots for the timeline (24 hours)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      const hour = i % 12 || 12;
      const amPm = i < 12 ? "AM" : "PM";
      slots.push(`${hour}:00 ${amPm}`);
    }
    return slots;
  }, []);

  // Convert time string (e.g., "2:00 PM") to minutes since midnight
  const timeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  return (
    <div className="flex">
      {/* Timeline column */}
      <div className="w-20 flex-shrink-0 border-r" ref={scrollContainerRef}>
        <div className="h-16 border-b"></div> {/* Empty cell for header */}
        <div className="relative">
          {timeSlots.map((time, index) => (
            <div
              key={index}
              className="h-16 border-b flex items-start justify-center text-xs text-gray-500 pt-1"
            >
              {time}
            </div>
          ))}
        </div>
      </div>

      {/* Days columns */}
      <div
        className="flex-grow grid"
        style={{
          gridTemplateColumns: `repeat(${filteredDaysArray.length}, 1fr)`,
        }}
      >
        {/* Day headers */}
        <div
          className="col-span-full grid sticky top-0 z-20 bg-white"
          style={{
            gridTemplateColumns: `repeat(${filteredDaysArray.length}, 1fr)`,
          }}
        >
          {filteredDaysArray.map((dayInfo, index) => (
            <div
              key={index}
              className={`h-16 border-b border-r p-2 flex flex-col items-center justify-center
                  ${
                    dayInfo.isOutsideMonth
                      ? "bg-gray-100 text-gray-600"
                      : "text-gray-700"
                  }
                  ${
                    dayInfo.date &&
                    new Date().toDateString() === dayInfo.date.toDateString()
                      ? "bg-blue-100"
                      : ""
                  }
                  ${
                    dayInfo.date.getDay() === 0 || dayInfo.date.getDay() === 6
                      ? "bg-red-50 text-red-500"
                      : ""
                  }
                `}
              onClick={() => openDayViewModal(dayInfo.date)}
            >
              <div className="text-xs font-medium">
                {dayNames[dayInfo.date.getDay()].substring(0, 3)}
              </div>
              <div className="text-lg font-bold">{dayInfo.day}</div>
              {dayInfo.isHoliday && (
                <div className="text-xs text-red-500 bg-red-50 rounded-sm py-0.5 px-1 mt-1">
                  {dayInfo.isHoliday}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Time grid for each day */}
        {filteredDaysArray.map((dayInfo, dayIndex) => (
          <div
            key={dayIndex}
            className="relative border-r"
            style={{
              gridColumn: dayIndex + 1,
              gridRow: 2,
              height: `${timeSlots.length * 64}px`,
            }}
          >
            {/* Hour grid lines */}
            {timeSlots.map((_, index) => (
              <div key={index} className="h-16 border-b"></div>
            ))}

            {/* Events for this day */}
            {getEventsForDay(dayInfo.date).map((event) => {
              const startMinutes = timeToMinutes(event.startTime);
              const endMinutes = timeToMinutes(event.endTime);
              const duration = endMinutes - startMinutes;

              // Calculate position and height
              const topPosition = (startMinutes / 60) * 64; // 64px per hour
              const height = (duration / 60) * 64;

              return (
                <div
                  key={event.id}
                  className="absolute left-1 right-1 bg-blue-100 text-blue-700 text-xs rounded-sm p-1 overflow-hidden"
                  style={{
                    top: `${topPosition}px`,
                    height: `${Math.max(height, 20)}px`, // Minimum height of 20px
                    zIndex: 10,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // You could add an event click handler here
                  }}
                >
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-xs">{`${event.startTime} - ${event.endTime}`}</div>
                </div>
              );
            })}

            {/* Click handler for adding new events */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => openNewEventModal(dayInfo.date)}
            ></div>
          </div>
        ))}
      </div>
      {/* DayViewModal */}
      <DayViewModal
        isOpen={isModalOpen}
        onClose={closeDayViewModal}
        day={selectedDay}
        events={selectedDay ? getEventsForDay(selectedDay) : []}
        addNewEvent={addNewEvent}
      />
    </div>
  );
}
