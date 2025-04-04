import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FileText, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { FaDribbble, FaKaggle } from "react-icons/fa6";
import { Stepper } from "../ui/Stepper";

function ApplicantCard({
  applicant,
  openModal,
}: {
  applicant: Applicant;
  openModal: (x: Applicant) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="border rounded-md p-4 flex flex-col items-center space-y-2 shadow">
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
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  applicant: Applicant;
  openModal: (x: Applicant) => void;
}) {
  const [activeApplicant, setActiveApplicant] = useState(applicant);

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
                  src={activeApplicant.profilePhoto}
                  alt={activeApplicant.name}
                />
                <AvatarFallback>{activeApplicant.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{activeApplicant.name}</h3>
                <p className="text-xs text-gray-500">
                  {activeApplicant.jobAppliedFor}
                </p>
              </div>
            </div>
            <div className="space-y-1 text-xs pb-2">
              <p>
                <Mail size={14} className="inline mr-2" />{" "}
                {activeApplicant.email}
              </p>
              <p>
                <Phone size={14} className="inline mr-2" />{" "}
                {activeApplicant.contact}
              </p>
              <p>
                <MapPin size={14} className="inline mr-2" />{" "}
                {activeApplicant.location}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Education</h4>
              <p className="text-gray-500">{activeApplicant.education}</p>
            </div>

            {activeApplicant.socials && (
              <div className="flex gap-3">
                {activeApplicant.socials.linkedIn && (
                  <a
                    href={activeApplicant.socials.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
                {activeApplicant.socials.github && (
                  <a
                    href={activeApplicant.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                  </a>
                )}
                {activeApplicant.socials.kaggle && (
                  <a
                    href={activeApplicant.socials.kaggle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaKaggle size={16} />
                  </a>
                )}
                {activeApplicant.socials.dribbble && (
                  <a
                    href={activeApplicant.socials.dribbble}
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
                activeApplicant.interviewStep == 2
                  ? "interview scheduled"
                  : "interview",
                "hired",
              ]}
              currentStep={activeApplicant.interviewStep}
              handleNext={() => {}}
              handlePrev={() => {}}
              handleClick={(x) => {
                if (x == 2) {
                  openModal(activeApplicant);
                }
                setActiveApplicant((prev) => ({
                  ...prev,
                  interviewStep: x,
                }));
              }}
            />
            <div className="pl-4 space-y-4 py-4">
              <div>
                <h4 className="font-medium mb-2">Applied Position</h4>
                <p className="text-gray-500">{activeApplicant.jobAppliedFor}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Applied Date</h4>
                <p className="text-gray-500">
                  {new Date(activeApplicant.appliedDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* View Resume Button */}
            {activeApplicant.resumeUrl && (
              <div className="text-right pt-4">
                <a
                  href={activeApplicant.resumeUrl}
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
