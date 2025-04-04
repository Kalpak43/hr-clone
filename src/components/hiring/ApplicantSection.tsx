import { Grid2X2, Info, Table } from "lucide-react";
// import { applicants } from "@/data";
import ApplicantCard from "./ApplicantCard";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useState } from "react";
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
              <div className="grid grid-cols-4 gap-4">
                {applicants.map((applicant) => (
                  <ApplicantCard
                    key={applicant.id}
                    applicant={applicant}
                    openModal={(x: Applicant) => {
                      setParticipant(x);
                      setOpen(true);
                    }}
                    setApplicants={setApplicants}
                  />
                ))}
              </div>
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
