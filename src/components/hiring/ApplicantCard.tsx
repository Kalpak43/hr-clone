import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

function ApplicantCard({ applicant }: { applicant: Applicant }) {
  return (
    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 shadow">
      <Avatar className="w-12 h-12 border-2 border-background mx-auto">
        <AvatarImage src={applicant.profilePhoto} alt={applicant.name} />
        <AvatarFallback>{applicant.name[0]}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <p className="font-[600]">{applicant.name}</p>
        <p className="text-gray-500">{applicant.jobAppliedFor}</p>
      </div>
      <Button variant={"outline"}>View Details</Button>
    </div>
  );
}

export default ApplicantCard;
