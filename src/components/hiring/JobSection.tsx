import { Info, Plus, Search } from "lucide-react";
import JobsTable from "./JobsTable";
import { jobs } from "@/data";
import { useState } from "react";
import { EditJobModal } from "./EditJobModal";
import { Button } from "../ui/button";
import { AddJobModal } from "./AddJobModal";

function JobSection() {
  const [shownJobs, setShownJobs] = useState(jobs);
  const [search, setSearch] = useState("");
  const [selectedEdit, setSelectedEdit] = useState<Job | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-md p-4 space-y-8">
      <div className="flex items-center justify-between">
        <p className="">
          Jobs Posted{" "}
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </p>

        <div className="flex items-center gap-2">
          <SearchJob searchTerm={search} handleSearch={(x) => setSearch(x)} />

          <Button
            // onClick={handleSubmit}
            className="ml-auto bg-blue-400 hover:bg-blue-500"
            onClick={() => setOpen(true)}
          >
            <Plus />
            Add Job
          </Button>
        </div>
      </div>
      <JobsTable
        jobs={[...shownJobs]
          .sort((a, b) => {
            const dateA = new Date(a.postedOn);
            const dateB = new Date(b.postedOn);
            return dateB.getTime() - dateA.getTime();
          })
          .filter((job) =>
            job.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )}
        setSelectedEdit={setSelectedEdit}
        deleteJob={(id: number) => {
          setShownJobs((prev) => prev.filter((job) => job.id !== id));
        }}
      />

      {selectedEdit && (
        <EditJobModal
          job={selectedEdit}
          onClose={() => setSelectedEdit(null)}
          onSave={(updatedJob: Job) => {
            setShownJobs(
              shownJobs.map((job) =>
                job.id === updatedJob.id ? updatedJob : job
              )
            );
            setSelectedEdit(null);
          }}
        />
      )}

      <AddJobModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={(newJob: Job) => {
          setShownJobs((prev) => [...prev, newJob]);
        }}
      />
    </div>
  );
}

export default JobSection;

export function SearchJob({
  searchTerm,
  handleSearch,
}: {
  searchTerm: string;
  handleSearch: (term: string) => void;
}) {
  return (
    <div className="border border-gray-300 bg-gray-50 rounded-md p-2 flex items-center relative min-w-3xs">
      <Search size={16} className="text-gray-600 mr-2" />
      <input
        type="text"
        className="text-sm pl-2 rounded-md focus:outline-none w-full"
        placeholder="Search Jobs..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
