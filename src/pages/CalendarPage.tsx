import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarView } from "@/components/calendar/CalendarView";
import { eventData } from "@/data";
import { useState, useCallback, useEffect } from "react";

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<any>({});
  const [events, setEvents] = useState(eventData || []);
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

    // useEffect(() => {
    //   const fetchHolidays = async () => {
    //     try {
    //       const apiKey = import.meta.env.VITE_CALENDAR_KEY;
    //       const response = await fetch(
    //         `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=IN&year=${year}`
    //       );
    //       const data = await response.json();
    //       if (data.response && data.response.holidays) {
    //         const formattedHolidays: { [key: string]: string } = {};
    //         data.response.holidays.forEach((holiday: any) => {
    //           formattedHolidays[holiday.date.iso] = holiday.name;
    //         });
    //         setHolidays(formattedHolidays);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching holidays:", error);
    //     }
    //   };

    //   fetchHolidays();
    // }, [year]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const openNewEventModal = (date: Date) => {
    setNewEventModalOpen(true);
    setNewEventDate(date);
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
        setTimeout(() => setHighlightedDate(null), 1500);
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
        <CalendarHeader
          currentDate={currentDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
          goToPreviousWeek={goToPreviousWeek}
          goToNextWeek={goToNextWeek}
          goToToday={goToToday}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          openNewEventModal={openNewEventModal}
        />

        <CalendarView
          currentDate={currentDate}
          viewMode={viewMode}
          holidays={holidays}
          events={events}
          filter={filter}
          highlightedDate={highlightedDate}
          openNewEventModal={openNewEventModal}
        />
      </div>
    </div>
  );
}

export default CalendarPage;
