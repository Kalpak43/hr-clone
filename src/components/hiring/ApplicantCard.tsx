import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { FaDribbble, FaKaggle } from "react-icons/fa6";
import { Stepper } from "../ui/Stepper";

function ApplicantCard({ applicant }: { applicant: Applicant }) {
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
      />
    </>
  );
}

export default ApplicantCard;

export function ApplicantModal({
  open,
  onOpenChange,
  applicant,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  applicant: Applicant;
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
              steps={["screening", "test task", "interview", "hired"]}
              currentStep={applicant.interviewStep}
              handleNext={() => {}}
              handlePrev={() => {}}
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
          </div>

          {/* <div>
            <h4 className="font-medium mb-2">Application Status</h4>
            <div className="flex items-center gap-2 text-sm">
              <span>Interview Step: {applicant.interviewStep}</span>
              <span>•</span>
              <span>
                Applied on:{" "}
                {new Date(applicant.appliedDate).toLocaleDateString()}
              </span>
            </div>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
