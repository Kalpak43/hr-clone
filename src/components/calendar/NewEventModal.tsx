import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

function NewEventModal({
  openAddEventModal,
  setOpenAddEventModal,
  addNewEvent,
  day,
}: {
  openAddEventModal: boolean;
  setOpenAddEventModal: React.Dispatch<React.SetStateAction<boolean>>;
  addNewEvent: (eventData: {
    date: string;
    title: string;
    startTime: string;
    endTime: string;
  }) => void;
  day: Date | null;
}) {
  const [eventData, setEventData] = useState({
    date: day
      ? `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(day.getDate()).padStart(2, "0")}`
      : "",
    title: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (eventData.title && eventData.startTime && eventData.endTime) {
      addNewEvent(eventData);
      setOpenAddEventModal(false);
    }
  };

  return (
    <Dialog open={openAddEventModal} onOpenChange={setOpenAddEventModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {/* Add your event form here */}
          <div className="space-y-4">
            <div>
              <label>Event Title</label>
              <Input
                name="title"
                placeholder="Enter event title"
                value={eventData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Start Time</label>
              <Input
                type="time"
                name="startTime"
                value={eventData.startTime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>End Time</label>
              <Input
                type="time"
                name="endTime"
                value={eventData.endTime}
                onChange={handleChange}
              />
            </div>
            <Button type="button" onClick={handleSave}>
              Save Event
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default NewEventModal;
