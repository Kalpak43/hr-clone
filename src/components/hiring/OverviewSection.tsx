import ApplicantCard from "@/components/hiring/ApplicantCard";
import JobsTable from "@/components/hiring/JobsTable";
import { Button } from "@/components/ui/button";
import { applicants, jobs } from "@/data";
import { ChevronRight, CircleArrowUp, Info } from "lucide-react";
import DateDropdown from "../DateDropdown";
import { useState } from "react";
import { parse, isEqual } from "date-fns";

function OverviewSection({
  setViewMode,
  shownInterview,
}: {
  setViewMode: React.Dispatch<
    React.SetStateAction<"overview" | "applicants" | "jobs">
  >;
  shownInterview: Interview[];
  setShownInterviews: React.Dispatch<React.SetStateAction<Interview[]>>;
}) {
  const [shownJobs, setShownJobs] = useState(jobs);
  const [_, setSelectedEdit] = useState<Job | null>(null);
  const [filterDate, setFilterDate] = useState<Date>(new Date());

  // Filter interviews by the selected date
  const filteredInterviews = shownInterview.filter((interview) => {
    const interviewDate = parse(interview.date, "yyyy-MM-dd", new Date());
    return isEqual(
      new Date(interviewDate.setHours(0, 0, 0, 0)),
      new Date(filterDate.setHours(0, 0, 0, 0))
    );
  });

  // Sort interviews by start time
  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    const timeA = parse(a.start_time, "hh:mm aa", new Date());
    const timeB = parse(b.start_time, "hh:mm aa", new Date());
    return timeA.getTime() - timeB.getTime();
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
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
        <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 shadow">
          <div className="flex items-center justify-between">
            <p className="">
              Hiring Rate{" "}
              <span className="ml-4">
                <Info className="inline text-gray-700" size={16} />
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-4xl font-[600] text-black">68%</p>
            <span className="border border-green-300 bg-green-100 text-green-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
              <CircleArrowUp size={12} className="" />
              8.9%
            </span>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 space-y-8">
        <div className="flex items-center justify-between">
          <p className="">
            Scheduled Interviews{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <div className="flex items-center gap-2">
            <DateDropdown
              onChange={(x) => {
                setFilterDate(x);
              }}
            />
          </div>
        </div>

        <div className="relative">
          {sortedInterviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No interviews scheduled for this date
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[22px] top-0 bottom-0 w-[2px] bg-gray-200" />

              {/* Timeline events */}
              <div className="space-y-4">
                {sortedInterviews.map((interview, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Timeline dot */}
                    <div className="relative z-10 mt-1">
                      <div className="h-4 w-4 rounded-full bg-blue-400 border-4 border-background mt-3" />
                    </div>

                    {/* Event content */}
                    <div className="flex-1">
                      <div className="bg-card rounded-md border p-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                          <h3 className="font-medium ">{interview.title}</h3>
                          <div className="text-sm font-medium text-muted-foreground mt-1 sm:mt-0">
                            {interview.start_time} - {interview.end_time}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {interview.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-md p-4 space-y-8">
        <div className="flex items-center justify-between">
          <p className="">
            Recent Applicants{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <Button variant="ghost" onClick={() => setViewMode("applicants")}>
            View More <ChevronRight />
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {applicants.slice(0, 4).map((applicant) => (
            // @ts-ignore
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              openModal={() => {}}
              setApplicants={() => {}}
            />
          ))}
        </div>
      </div>

      <div className="border rounded-md p-4 space-y-8">
        <div className="flex items-center justify-between">
          <p className="">
            Recent Jobs{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <Button variant="ghost" onClick={() => setViewMode("jobs")}>
            View More <ChevronRight />
          </Button>
        </div>

        <JobsTable
          jobs={[...shownJobs]
            .sort((a, b) => {
              const dateA = new Date(a.postedOn);
              const dateB = new Date(b.postedOn);
              return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 4)}
          setSelectedEdit={setSelectedEdit}
          deleteJob={(id: number) => {
            setShownJobs((prev) => prev.filter((job) => job.id !== id));
          }}
        />
      </div>
    </div>
  );
}

export default OverviewSection;
