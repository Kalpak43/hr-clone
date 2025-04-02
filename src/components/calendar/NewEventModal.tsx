import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

function NewEventModal({
  openAddEventModal,
  setOpenAddEventModal,
}: {
  openAddEventModal: boolean;
  setOpenAddEventModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
              <Input placeholder="Enter event title" />
            </div>
            <div>
              <label>Start Time</label>
              <Input type="time" />
            </div>
            <div>
              <label>End Time</label>
              <Input type="time" />
            </div>
            <Button
              type="button"
              onClick={() => {
                // Handle event creation logic here
                setOpenAddEventModal(false);
              }}
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
