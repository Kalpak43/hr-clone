import { CircleDotDashed, Grid2X2, Info, Table } from "lucide-react";
// import { applicants } from "@/data";
import ApplicantCard from "./ApplicantCard";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useEffect, useState } from "react";
import ApplicantTable from "./ApplicantTable";
import AddInterviewModal from "./AddInterviewModal";

function ApplicantSection({
  setShownInterviews,
  applicants,
  setApplicants,
}: {
  shownInterview: Interview[];
  setShownInterviews: React.Dispatch<React.SetStateAction<Interview[]>>;
  applicants: Applicant[];
  setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [open, setOpen] = useState(false);
  const [participant, setParticipant] = useState<Applicant | null>(null);

  useEffect(() => {
    console.log("dwa2: ", participant);
  }, [participant]);

  useEffect(() => {
    console.log("wew: ", open);
  }, [open]);

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
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(x: "grid" | "table") => setViewMode(x)}
            className="border"
          >
            <ToggleGroupItem value="grid">
              <Grid2X2 />
            </ToggleGroupItem>
            <ToggleGroupItem value="table">
              <Table />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {
          {
            grid: (
              <ApplicantBoard
                applicants={applicants}
                setApplicants={setApplicants}
                setParticipant={setParticipant}
                setOpen={setOpen}
              />
            ),
            table: <ApplicantTable applicants={applicants} />,
          }[viewMode]
        }
      </div>
      {participant && (
        <AddInterviewModal
          open={open}
          setOpen={setOpen}
          participant={participant}
          addInterview={(newInterview: Interview) => {
            setShownInterviews((prev) => [...prev, newInterview]);
          }}
        />
      )}
    </div>
  );
}

export default ApplicantSection;

// Add this before the ApplicantBoard component
const groupApplicantsByStep = (applicants: Applicant[]) => {
  return {
    screening: applicants.filter((app) => app.interviewStep === 1),
    testTask: applicants.filter((app) => app.interviewStep === 2),
    interview: applicants.filter((app) => app.interviewStep === 3),
    hired: applicants.filter((app) => app.interviewStep === 4),
  };
};

export function ApplicantBoard({
  applicants,
  setApplicants,
  setParticipant,
  setOpen,
}: {
  applicants: Applicant[];
  setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>;
  setParticipant: React.Dispatch<React.SetStateAction<Applicant | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const groupedApplicants = groupApplicantsByStep(applicants);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, applicantId: number) => {
    e.dataTransfer.setData("applicantId", applicantId.toString());
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, newStep: number) => {
    e.preventDefault();
    const applicantId = parseInt(e.dataTransfer.getData("applicantId"));

    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === applicantId
          ? { ...applicant, interviewStep: newStep }
          : applicant
      )
    );
  };

  // Allow drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div
        className="space-y-4"
        onDrop={(e) => handleDrop(e, 1)}
        onDragOver={handleDragOver}
      >
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <CircleDotDashed className="text-gray-500" size={18} />
            <h3 className="font-medium">Screening</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
              {groupedApplicants.screening.length} applicants
            </span>
          </div>
        </div>
        <div className="space-y-2">
          {groupedApplicants.screening.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              openModal={(x: Applicant) => {
                setParticipant(x);
                setOpen(true);
              }}
              setApplicants={setApplicants}
              onDragStart={(e) => handleDragStart(e, applicant.id)}
            />
          ))}
        </div>
      </div>

      <div
        className="space-y-4"
        onDrop={(e) => handleDrop(e, 2)}
        onDragOver={handleDragOver}
      >
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <CircleDotDashed className="text-gray-500" size={18} />
            <h3 className="font-medium">Test Task</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
              {groupedApplicants.testTask.length} applicants
            </span>
          </div>
        </div>
        <div className="space-y-2">
          {groupedApplicants.testTask.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              openModal={(x: Applicant) => {
                setParticipant(x);
                setOpen(true);
              }}
              setApplicants={setApplicants}
              onDragStart={(e) => handleDragStart(e, applicant.id)}
            />
          ))}
        </div>
      </div>

      <div
        className="space-y-4"
        onDrop={(e) => handleDrop(e, 3)}
        onDragOver={handleDragOver}
      >
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <CircleDotDashed className="text-gray-500" size={18} />
            <h3 className="font-medium">Interview</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
              {groupedApplicants.interview.length} applicants
            </span>
          </div>
        </div>
        <div className="space-y-2">
          {groupedApplicants.interview.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              openModal={(x: Applicant) => {
                setParticipant(x);
                setOpen(true);
              }}
              setApplicants={setApplicants}
              onDragStart={(e) => handleDragStart(e, applicant.id)}
            />
          ))}
        </div>
      </div>

      <div
        className="space-y-4"
        onDrop={(e) => handleDrop(e, 4)}
        onDragOver={handleDragOver}
      >
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <CircleDotDashed className="text-gray-500" size={18} />
            <h3 className="font-medium">Hired</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
              {groupedApplicants.hired.length} applicants
            </span>
          </div>
        </div>
        <div className="space-y-2">
          {groupedApplicants.hired.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              openModal={(x: Applicant) => {
                setParticipant(x);
                setOpen(true);
              }}
              setApplicants={setApplicants}
              onDragStart={(e) => handleDragStart(e, applicant.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
