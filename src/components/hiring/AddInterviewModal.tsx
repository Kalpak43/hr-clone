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

interface Interview {
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  participant: {
    id: number;
    name: string;
    profilePhoto: string;
    email: string;
    jobAppliedFor: string;
  };
}

function AddInterviewModal({
  open,
  setOpen,
  addInterview,
  participant,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addInterview: (newInterview: Interview) => void;
  participant: Applicant;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const { title, description, date, start_time, end_time } = formData;
    if (title && date && start_time && end_time) {
      addInterview({
        ...{ title, description, date, start_time, end_time },
        participant: {
          ...participant,
        },
      } as Interview);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="space-y-4">
            <div>
              <label>Date</label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Title</label>
              <Input
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description</label>
              <Textarea
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Start Time</label>
                <Input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>End Time</label>
                <Input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button
              type="button"
              className="bg-blue-400 hover:bg-blue-500"
              onClick={handleSave}
            >
              Save Interview
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default AddInterviewModal;
