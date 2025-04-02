import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

function NewEventModal({
  openNewEventModal,
}: {
  openNewEventModal: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-400 hover:bg-blue-500"
          variant="default"
          onClick={() => openNewEventModal()}
        >
          <Plus />
          Add Event
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}

export default NewEventModal;
