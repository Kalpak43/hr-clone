import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Calendar, List } from "lucide-react";
import NewEventModal from "./NewEventModal";

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: string;
  setViewMode: (mode: string) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  goToToday: () => void;
  searchTerm: string;
  handleSearchChange: (e: any) => void;
  openNewEventModal: () => void;
}

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

export function CalendarHeader({
  currentDate,
  viewMode,
  setViewMode,
  goToPreviousMonth,
  goToNextMonth,
  goToPreviousWeek,
  goToNextWeek,
  goToToday,
  searchTerm,
  handleSearchChange,
  openNewEventModal,
}: CalendarHeaderProps) {
  const getWeekDateRange = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startMonth = startOfWeek.getMonth();
    const endMonth = endOfWeek.getMonth();
    const startYear = startOfWeek.getFullYear();
    const endYear = endOfWeek.getFullYear();

    if (startMonth === endMonth && startYear === endYear) {
      return `${
        monthNames[startMonth]
      } ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${startYear}`;
    } else if (startYear === endYear) {
      return `${monthNames[startMonth]} ${startOfWeek.getDate()} - ${
        monthNames[endMonth]
      } ${endOfWeek.getDate()}, ${startYear}`;
    } else {
      return `${
        monthNames[startMonth]
      } ${startOfWeek.getDate()}, ${startYear} - ${
        monthNames[endMonth]
      } ${endOfWeek.getDate()}, ${endYear}`;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && setViewMode(value)}
          className="border"
          size={"sm"}
        >
          <ToggleGroupItem
            value="month"
            aria-label="Month view"
            className=" text-xs"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Month
          </ToggleGroupItem>
          <ToggleGroupItem
            value="week"
            aria-label="Week view"
            className=" text-xs"
          >
            <List className="h-4 w-4 mr-1" />
            Week
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={
              viewMode === "month" ? goToPreviousMonth : goToPreviousWeek
            }
            className="focus:outline-none"
          >
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
          <h2 className="font-semibold">
            {viewMode === "month"
              ? `${
                  monthNames[currentDate.getMonth()]
                } ${currentDate.getFullYear()}`
              : getWeekDateRange()}
          </h2>
          <button
            onClick={viewMode === "month" ? goToNextMonth : goToNextWeek}
            className="focus:outline-none"
          >
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </button>
          <Button
            variant={"outline"}
            className={
              currentDate.getMonth() != new Date().getMonth() ||
              currentDate.getDate() != new Date().getDate()
                ? "text-xs"
                : "bg-gray-100 text-xs"
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
            {/* @ts-ignore */}
          <NewEventModal openNewEventModal={openNewEventModal} />
        </div>
      </div>
    </div>
  );
}
