import { useCallback } from "react";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";

interface CalendarViewProps {
  currentDate: Date;
  viewMode: string;
  holidays: any;
  events: any[];
  filter: string;
  highlightedDate: Date | null;
  openNewEventModal: () => void;
  addNewEvent: (eventData: {
    date: string;
    title: string;
    startTime: string;
    endTime: string;
    description: string;
  }) => void;
}

export function CalendarView({
  currentDate,
  viewMode,
  holidays,
  events,
  filter,
  highlightedDate,
  openNewEventModal,
  addNewEvent,
}: CalendarViewProps) {
  const getEventsForDay = useCallback(
    (date: Date) => {
      return events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      });
    },
    [events]
  );

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <div className="absolute inset-0 overflow-y-auto space-y-2  border rounded-md">
        <div className="flex-1 h-full">
          {viewMode === "month" ? (
            <MonthView
              currentDate={currentDate}
              holidays={holidays}
              filter={filter}
              highlightedDate={highlightedDate}
              openNewEventModal={openNewEventModal}
              getEventsForDay={getEventsForDay}
              addNewEvent={addNewEvent}
            />
          ) : (
            <WeekView
              currentDate={currentDate}
              holidays={holidays}
              filter={filter}
              highlightedDate={highlightedDate}
              openNewEventModal={openNewEventModal}
              getEventsForDay={getEventsForDay}
              addNewEvent={addNewEvent}
            />
          )}
        </div>
      </div>
    </div>
  );
}
