import { Info, Search } from "lucide-react";
import JobsTable from "./JobsTable";
import { jobs } from "@/data";
import { useState } from "react";

function JobSection() {
  const [search, setSearch] = useState("");

  return (
    <div className="border rounded-md p-4 space-y-8">
      <div className="flex items-center justify-between">
        <p className="">
          Jobs Posted{" "}
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </p>

        <SearchJob searchTerm={search} handleSearch={(x) => setSearch(x)} />
      </div>
      <JobsTable
        jobs={[...jobs]
          .sort((a, b) => {
            const dateA = new Date(a.postedOn);
            const dateB = new Date(b.postedOn);
            return dateB.getTime() - dateA.getTime();
          })
          .filter((job) =>
            job.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )}
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
