import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AddJobModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (newJob: Job) => void;
};

export function AddJobModal({ open, onClose, onAdd }: AddJobModalProps) {
  const [formData, setFormData] = useState<Job>({
    id: Date.now(), // Or use a UUID
    title: "",
    description: "",
    status: "Active",
    deadline: "",
    skills: [],
    qualifications: [],
    postedOn: new Date().toISOString(),
    applicants: [],
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (field: keyof Job, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleAddQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, ""],
    }));
  };

  const handleRemoveQualification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
  };

  const handleQualificationChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.qualifications];
      updated[index] = value;
      return { ...prev, qualifications: updated };
    });
  };

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
    setFormData({
      id: Date.now(),
      title: "",
      description: "",
      status: "Active",
      deadline: "",
      skills: [],
      qualifications: [],
      postedOn: new Date().toISOString(),
      applicants: [],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add New Job</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[400px] overflow-y-auto space-y-8 py-2">
          {/* Title */}
          <div className="space-y-2">
            <label className="font-medium">Job Title</label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Status and Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="font-medium">Deadline</label>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-2">
            <label className="font-medium">Skills Required</label>

            <div className="flex gap-2 mt-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill"
              />
              <Button onClick={handleAddSkill}>Add</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer"
                  onClick={() => handleRemoveSkill(index)}
                >
                  {skill} <X className="w-4 h-4" />
                </span>
              ))}
            </div>
          </div>

          {/* Qualifications Section */}
          <div className="space-y-2">
            <label className="font-medium">Qualifications</label>
            <div className="space-y-2">
              {formData.qualifications.map((qualification, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={qualification}
                    onChange={(e) =>
                      handleQualificationChange(index, e.target.value)
                    }
                    placeholder="Enter qualification"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveQualification(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddQualification}
              >
                Add Qualification
              </Button>
            </div>
          </div>
        </DialogDescription>

        <DialogFooter>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="ml-auto bg-green-500 hover:bg-green-600"
            >
              Add Job
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
