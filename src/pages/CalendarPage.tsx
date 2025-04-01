import { Button } from "@/components/ui/button";
import { eventData } from "@/data";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  StretchVertical,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<any>({});
  const [events, setEvents] = useState(eventData || []);
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);
  const [filter, setFilter] = useState("all"); // 'all', 'weekdays', 'weekends'

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const apiKey = import.meta.env.VITE_CALENDAR_KEY;
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=IN&year=${year}`
        );
        const data = await response.json();
        if (data.response && data.response.holidays) {
          const formattedHolidays: { [key: string]: string } = {};
          data.response.holidays.forEach((holiday: any) => {
            formattedHolidays[holiday.date.iso] = holiday.name;
          });
          setHolidays(formattedHolidays);
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, [year]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
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

  const daysArray = getDaysArray();

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Sunday (0) and Saturday (6) are weekends
  };

  const isWeekend = (date: Date) => {
    return !isWeekday(date);
  };

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
    return true; // 'all' or outside month days
  });

  const openNewEventModal = (date: Date) => {
    setNewEventModalOpen(true);
    setNewEventDate(date);
  };

  const closeNewEventModal = () => {
    setNewEventModalOpen(false);
    setNewEventDate(null);
    setNewEventTitle("");
  };

  const handleAddEvent = () => {
    if (newEventDate && newEventTitle) {
      const newEvent = {
        id: Date.now(),
        date: newEventDate.toISOString().split("T")[0],
        title: newEventTitle,
      };
      setEvents([...events, newEvent]);
      closeNewEventModal();
    }
  };

  const getEventsForDay = (date: Date) => {
    const dateISO = date.toISOString().split("T")[0]; // Normalize to YYYY-MM-DD
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  const handleSearchChange = (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const foundEvent = events.find((event) =>
        event.title.toLowerCase().includes(term.toLowerCase())
      );
      if (foundEvent) {
        setHighlightedDate(new Date(foundEvent.date));
        console.log(new Date(foundEvent.date));
        setTimeout(() => setHighlightedDate(null), 1500); // Briefly highlight
      } else {
        setHighlightedDate(null);
      }
    } else {
      setHighlightedDate(null);
    }
  };

  return (
    <div className="hero h-full">
      <div className="border border-gray-300 rounded-md p-4 space-y-8 h-full flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <button onClick={goToPreviousMonth} className="focus:outline-none">
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <h2 className="text-xl font-semibold">
              {monthNames[month]} {year}
            </h2>
            <button onClick={goToNextMonth} className="focus:outline-none">
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
            <Button
              variant={"outline"}
              className={
                currentDate.getMonth() != new Date().getMonth()
                  ? " text-xs"
                  : " bg-gray-100 text-xs"
              }
              onClick={goToToday}
              size={"sm"}
            >
              <span>Jump to today</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="border border-gray-300 bg-gray-50 rounded-md p-2 flex items-center relative min-w-3xs">
              <Search size={16} className="text-gray-600 mr-2" />
              <input
                type="text"
                className="text-sm pl-2 rounded-md focus:outline-none w-full"
                placeholder="Search Event..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <Button
              className="bg-blue-400 hover:bg-blue-500"
              variant="default"
              onClick={() => {
                openNewEventModal(new Date());
              }} // Open the dialog on button click
            >
              <Plus />
              Add Employee
            </Button>
          </div>
        </div>

        <div className="space-y-2 flex-1 flex flex-col h-full">
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center font-semibold py-2 border rounded-md"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 overflow-y-auto grid grid-cols-7 gap-1">
              {filteredDaysArray.map((dayInfo, index) => (
                <div
                  key={index}
                  className={`relative rounded-md border p-2 min-h-24 ${
                    dayInfo.isOutsideMonth
                      ? "bg-gray-100 text-gray-600"
                      : "text-gray-700"
                  } ${
                    dayInfo.date &&
                    new Date().toDateString() === dayInfo.date.toDateString() &&
                    !dayInfo.isOutsideMonth
                      ? "border-2 border-blue-400 bg-blue-100"
                      : ""
                  } ${
                    highlightedDate &&
                    dayInfo.date &&
                    highlightedDate.toDateString() ===
                      dayInfo.date.toDateString() &&
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
                  onClick={() =>
                    !dayInfo.isOutsideMonth && openNewEventModal(dayInfo.date)
                  }
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
