import { Info } from "lucide-react";
import { applicants } from "@/data";
import ApplicantCard from "./ApplicantCard";

function ApplicantSection() {
  return (
    <div className="border rounded-md p-4">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="">
            Applicants List{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicantSection;
