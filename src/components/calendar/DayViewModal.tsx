import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DayViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: Date | null;
  events: { id: string; title: string; startTime: string; endTime: string }[];
}

const DayViewModal: React.FC<DayViewModalProps> = ({
  isOpen,
  onClose,
  day,
  events,
}) => {
  if (!day) return null;

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const amPm = i < 12 ? "AM" : "PM";
    return `${hour}:00 ${amPm}`;
  });

  const timeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Day View - {day.toDateString()}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="max-h-[400px] overflow-y-auto">
          <div className="relative flex">
            <div className="w-20 border-r">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="h-16 flex items-start justify-center text-xs text-gray-500 pt-1 border-b"
                >
                  {time}
                </div>
              ))}
            </div>
            <div className="relative flex-grow">
              {events.map((event) => {
                const startMinutes = timeToMinutes(event.startTime);
                const endMinutes = timeToMinutes(event.endTime);
                const duration = endMinutes - startMinutes;
                const topPosition = (startMinutes / 60) * 64;
                const height = (duration / 60) * 64;

                return (
                  <div
                    key={event.id}
                    className="absolute left-2 right-2 bg-blue-200 text-blue-800 text-xs rounded-md p-2 shadow-md"
                    style={{
                      top: `${topPosition}px`,
                      height: `${Math.max(height, 24)}px`,
                      zIndex: 10,
                    }}
                  >
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-xs">{`${event.startTime} - ${event.endTime}`}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogDescription>
        <Button variant="destructive" onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DayViewModal;
