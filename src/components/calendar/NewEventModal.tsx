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
import { Textarea } from "../ui/textarea";

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
    description: string;
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
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
              <label>Description</label>
              <Textarea
                name="description"
                placeholder="Enter event description"
                value={eventData.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <Button
              type="button"
              className="bg-blue-400 hover:bg-blue-500"
              onClick={handleSave}
            >
              Save Event
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default NewEventModal;
