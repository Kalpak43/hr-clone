import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarView } from "@/components/calendar/CalendarView";
import { eventData } from "@/data";
import { useState } from "react";

function CalendarPage2() {
  const [currentDate, setCurrentDate] = useState(new Date());
  // @ts-ignore
  const [holidays, setHolidays] = useState<any>({});
  // @ts-ignore
  const [events, setEvents] = useState(eventData || []);
  // @ts-ignore
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);
  // @ts-ignore
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  // const [newEventTitle, setNewEventTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);
  // @ts-ignore
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

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
          // @ts-ignore
          openNewEventModal={openNewEventModal}
        />

        <CalendarView
          currentDate={currentDate}
          viewMode={viewMode}
          holidays={holidays}
          events={events}
          filter={filter}
          highlightedDate={highlightedDate}
          // @ts-ignore
          openNewEventModal={openNewEventModal}
        />
      </div>
    </div>
  );
}

export default CalendarPage2;
