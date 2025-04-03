import ApplicantCard from "@/components/hiring/ApplicantCard";
import JobsTable from "@/components/hiring/JobsTable";
import { Button } from "@/components/ui/button";
import { applicants, jobs } from "@/data";
import { ChevronRight, CircleArrowUp, Info } from "lucide-react";

function OverviewSection() {
  return (
    <div className="border rounded-md p-4 min-h-full space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 shadow">
          <div className="flex items-center justify-between">
            <p className="">
              Total Applications{" "}
              <span className="ml-4">
                <Info className="inline text-gray-700" size={16} />
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-4xl font-[600] text-black">173</p>
            <span className="border border-green-300 bg-green-100 text-green-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
              <CircleArrowUp size={12} className="" />
              1.8%
            </span>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 shadow">
          <div className="flex items-center justify-between">
            <p className="">
              Interviewed{" "}
              <span className="ml-4">
                <Info className="inline text-gray-700" size={16} />
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-4xl font-[600] text-black">85</p>
            <span className="border border-green-300 bg-green-100 text-green-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
              <CircleArrowUp size={12} className="" />
              4.10%
            </span>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 shadow">
          <div className="flex items-center justify-between">
            <p className="">
              Job Openings{" "}
              <span className="ml-4">
                <Info className="inline text-gray-700" size={16} />
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-4xl font-[600] text-black">20</p>
            <span className="border border-green-300 bg-green-100 text-green-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
              <CircleArrowUp size={12} className="" />
              8.9%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="">
            Recent Applicants{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <Button variant="ghost">
            View More <ChevronRight />
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {applicants.slice(0, 4).map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="">
            Recent Jobs{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <Button variant="ghost">
            View More <ChevronRight />
          </Button>
        </div>

        <JobsTable jobs={jobs.slice(0, 4)} />
      </div>
    </div>
  );
}

export default OverviewSection;
