import { Grid2X2, Info, Table } from "lucide-react";
import { applicants } from "@/data";
import ApplicantCard from "./ApplicantCard";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useState } from "react";
import ApplicantTable from "./ApplicantTable";

function ApplicantSection() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

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
                  <ApplicantCard key={applicant.id} applicant={applicant} />
                ))}
              </div>
            ),
            table: <ApplicantTable applicants={applicants} />,
          }[viewMode]
        }
      </div>
    </div>
  );
}

export default ApplicantSection;
