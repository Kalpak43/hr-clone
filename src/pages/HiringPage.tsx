import ApplicantCard from "@/components/hiring/ApplicantCard";
import ApplicantSection from "@/components/hiring/ApplicantSection";
import JobSection from "@/components/hiring/JobSection";
import JobsTable from "@/components/hiring/JobsTable";
import OverviewSection from "@/components/hiring/OverviewSection";
import { Button } from "@/components/ui/button";
import { applicants, jobs } from "@/data";
import {
  ChartNoAxesGantt,
  ChevronRight,
  CircleArrowUp,
  Info,
  List,
  Users2,
} from "lucide-react";
import { useState } from "react";

function HiringPage() {
  const [viewMode, setViewMode] = useState<"overview" | "applicants" | "jobs">(
    "overview"
  );

  return (
    <main className="hero h-full">
      <div className="flex max-md:flex-col max-md:items-start gap-2 items-center justify-between">
        <div className="flex items-center max-md:justify-between gap-2 text-gray-700 w-full">
          <Button
            variant={viewMode == "overview" ? "outline" : "ghost"}
            onClick={() => setViewMode("overview")}
            className={viewMode == "overview" ? " bg-gray-100" : ""}
          >
            <ChartNoAxesGantt size={12} />
            <span>Overview</span>
          </Button>
          <Button
            variant={viewMode == "applicants" ? "outline" : "ghost"}
            className={viewMode == "applicants" ? " bg-gray-100" : ""}
            onClick={() => setViewMode("applicants")}
          >
            <Users2 size={12} />
            <span>Applicants</span>
          </Button>
          <Button
            variant={viewMode == "jobs" ? "outline" : "ghost"}
            onClick={() => setViewMode("jobs")}
            className={viewMode == "jobs" ? " bg-gray-100" : ""}
          >
            <List size={12} />
            <span>Jobs</span>
          </Button>
        </div>

        {/* <Button
          className="ml-auto bg-blue-400 hover:bg-blue-500"
          // onClick={() => setOpen(true)}
        >
          <Plus size={12} />
          <span>Add Task</span>
        </Button> */}
      </div>

      {
        {
          overview: <OverviewSection />,
          applicants: <ApplicantSection />,
          jobs: <JobSection />,
        }[viewMode]
      }
    </main>
  );
}

export default HiringPage;
