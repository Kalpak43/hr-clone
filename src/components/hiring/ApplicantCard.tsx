import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FileText, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { FaDribbble, FaKaggle } from "react-icons/fa6";
import { Stepper } from "../ui/Stepper";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

function ApplicantCard({
  applicant,
  openModal,
  setApplicants,
  onDragStart,
}: {
  applicant: Applicant;
  openModal: (x: Applicant) => void;
  setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>;
  onDragStart: (e: React.DragEvent, taskId: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextStep = (id: number) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id
          ? { ...applicant, interviewStep: applicant.interviewStep + 1 }
          : applicant
      )
    );
  };

  return (
    <>
      <div
        draggable
        onDragStart={(e) => onDragStart(e, applicant.id)}
        className="border rounded-md p-4 flex flex-col items-center space-y-2 shadow relative"
      >
        {applicant.interviewStep != 4 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="p-0 absolute right-0 top-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {applicant.interviewStep == 3 && (
                <DropdownMenuItem
                  onClick={() => {
                    openModal(applicant);
                  }}
                >
                  Schedule an Interview
                </DropdownMenuItem>
              )}
              {applicant.interviewStep != 4 && (
                <DropdownMenuItem
                  onClick={() => {
                    handleNextStep(applicant.id);
                  }}
                >
                  Promote to Next Step
                </DropdownMenuItem>
              )}
              {/* Add more options here if needed */}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Avatar className="w-12 h-12 border-2 border-background mx-auto">
          <AvatarImage src={applicant.profilePhoto} alt={applicant.name} />
          <AvatarFallback>{applicant.name[0]}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-[600]">{applicant.name}</p>
          <p className="text-gray-500">{applicant.jobAppliedFor}</p>
        </div>
        <Button variant={"outline"} onClick={() => setIsModalOpen(true)}>
          View Details
        </Button>
      </div>

      <ApplicantModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        applicant={applicant}
        openModal={openModal}
        setApplicants={setApplicants}
      />
    </>
  );
}

export default ApplicantCard;

export function ApplicantModal({
  open,
  onOpenChange,
  applicant,
  openModal,
  setApplicants,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  applicant: Applicant;
  openModal: (x: Applicant) => void;
  setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Applicant Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 divide-x py-4 text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-2">
              <Avatar className="w-16 h-16 border-2 border-background">
                <AvatarImage
                  src={applicant.profilePhoto}
                  alt={applicant.name}
                />
                <AvatarFallback>{applicant.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{applicant.name}</h3>
                <p className="text-xs text-gray-500">
                  {applicant.jobAppliedFor}
                </p>
              </div>
            </div>
            <div className="space-y-1 text-xs pb-2">
              <p>
                <Mail size={14} className="inline mr-2" /> {applicant.email}
              </p>
              <p>
                <Phone size={14} className="inline mr-2" /> {applicant.contact}
              </p>
              <p>
                <MapPin size={14} className="inline mr-2" />{" "}
                {applicant.location}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Education</h4>
              <p className="text-gray-500">{applicant.education}</p>
            </div>

            {applicant.socials && (
              <div className="flex gap-3">
                {applicant.socials.linkedIn && (
                  <a
                    href={applicant.socials.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
                {applicant.socials.github && (
                  <a
                    href={applicant.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                  </a>
                )}
                {applicant.socials.kaggle && (
                  <a
                    href={applicant.socials.kaggle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaKaggle size={16} />
                  </a>
                )}
                {applicant.socials.dribbble && (
                  <a
                    href={applicant.socials.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDribbble size={16} />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="col-span-2 divide-y">
            <Stepper
              steps={[
                "screening",
                "test task",
                applicant.interviewStep == 2
                  ? "interview scheduled"
                  : "interview",
                "hired",
              ]}
              currentStep={applicant.interviewStep}
              handleNext={() => {}}
              handlePrev={() => {}}
              handleClick={(x) => {
                if (x == 2) {
                  openModal(applicant);
                }
                setApplicants((prev) =>
                  prev.map((a) =>
                    a.id === applicant.id ? { ...a, interviewStep: x } : a
                  )
                );
              }}
            />
            <div className="pl-4 space-y-4 py-4">
              <div>
                <h4 className="font-medium mb-2">Applied Position</h4>
                <p className="text-gray-500">{applicant.jobAppliedFor}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Applied Date</h4>
                <p className="text-gray-500">
                  {new Date(applicant.appliedDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* View Resume Button */}
            {applicant.resumeUrl && (
              <div className="text-right pt-4">
                <a
                  href={applicant.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-400 text-primary-foreground hover:bg-blue-500 h-10 px-4 py-2"
                >
                  <FileText size={16} className="mr-2" />
                  View Resume
                </a>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
