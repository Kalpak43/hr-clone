import BudgetAllocation from "@/components/projects/BudgetAllocation";
import CompletionProgress from "@/components/projects/CompletionProgress";
import ProjectStatus from "@/components/projects/ProjectStatus";
import { CircleArrowUp, Info, Plus, Search } from "lucide-react";
import ProjectsTable from "@/components/projects/ProjectsTable";
import { projects } from "@/data";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewProjectModal from "@/components/projects/NewProjectModal";

function ProjectsPage() {
  const [shownProjects, setShownProjects] = useState(projects);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    priority: "All",
    progress: "All",
    budget: "All",
    status: "All",
  });

  interface Filters {
    startDate: string;
    endDate: string;
    priority: string;
    progress: string;
    budget: string;
    status: string;
  }

  type FilterKey = keyof Filters;

  const handleFilterChange = (key: FilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProjects = shownProjects.filter((project) => {
    return (
      project.name.toLowerCase().includes(search.toLowerCase()) &&
      (filters.startDate === "" ||
        new Date(project.start_date) >= new Date(filters.startDate)) &&
      (filters.endDate === "" ||
        new Date(project.end_date) <= new Date(filters.endDate)) &&
      (filters.priority === "All" || project.priority === filters.priority) &&
      (filters.progress === "All" ||
        project.progress >= parseInt(filters.progress)) &&
      (filters.budget === "All" ||
        project.budget <= parseInt(filters.budget)) &&
      (filters.status === "All" || project.status === filters.status)
    );
  });

  const [open, setOpen] = useState(false);

  return (
    <div className="hero space-y-8">
      <ProjectStats />
      <CompletionProgress />
      <div className="grid grid-cols-5 gap-4">
        <ProjectStatus />
        <BudgetAllocation />
      </div>

      <div className="p-6 space-y-6 border rounded-md">
        <div className="flex items-center justify-between">
          <p>
            Projects List{" "}
            <Info className="ml-2 inline text-gray-700" size={16} />
          </p>
          <div className="flex items-center gap-2">
            <SearchProject
              searchTerm={search}
              handleSearch={(x) => setSearch(x)}
            />
            <Button
              // onClick={handleSubmit}
              className="ml-auto bg-blue-400 hover:bg-blue-500"
              onClick={() => setOpen(true)}
            >
              <Plus />
              Add Project
            </Button>
          </div>
        </div>

        <div className="flex items-end justify-start gap-2">
          <div>
            <label htmlFor="" className="text-xs text-gray-600">
              Start Date
            </label>
            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="max-w-[150px]"
            />
          </div>
          <div>
            <label htmlFor="" className="text-xs text-gray-600">
              End Date
            </label>
            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="max-w-[150px]"
            />
          </div>

          <Select
            onValueChange={(value) => handleFilterChange("priority", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("progress", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Min Progress %" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Min Progress %</SelectItem>
              <SelectItem value="10">10%</SelectItem>
              <SelectItem value="25">25%</SelectItem>
              <SelectItem value="50">50%</SelectItem>
              <SelectItem value="75">75%</SelectItem>
              <SelectItem value="100">100%</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("budget", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Max Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Max Budget</SelectItem>
              <SelectItem value="5000">5,000</SelectItem>
              <SelectItem value="10000">10,000</SelectItem>
              <SelectItem value="25000">25,000</SelectItem>
              <SelectItem value="50000">50,000</SelectItem>
              <SelectItem value="100000">100,000</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="In Progresss">In Progresss</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ProjectsTable projects={filteredProjects} />
      </div>

      <NewProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onCreate={(newProject: Project) => {
          setShownProjects((prev) => [...prev, newProject]);
        }}
      />
    </div>
  );
}

export default ProjectsPage;

export function SearchProject({
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
        placeholder="Search Projects..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

function ProjectStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Total Projects */}
      <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 shadow">
        <div className="flex items-center justify-between">
          <p className="">Total Projects</p>
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-4xl font-[600] text-black">173</p>
          <span className="border border-green-300 bg-green-100 text-green-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
            <CircleArrowUp size={12} className="" />
            2.5%
          </span>
        </div>
      </div>

      {/* Completed Projects */}
      <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 shadow">
        <div className="flex items-center justify-between">
          <p className="">Completed Projects</p>
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-4xl font-[600] text-black">124</p>
          <span className="border border-green-300 bg-green-100 text-green-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
            <CircleArrowUp size={12} className="" />
            5.1%
          </span>
        </div>
      </div>

      {/* Ongoing Projects */}
      <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 shadow">
        <div className="flex items-center justify-between">
          <p className="">Ongoing Projects</p>
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-4xl font-[600] text-black">38</p>
          <span className="border border-yellow-300 bg-yellow-100 text-yellow-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
            <CircleArrowUp size={12} className="" />
            1.8%
          </span>
        </div>
      </div>

      {/* High Priority Projects */}
      <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8 shadow">
        <div className="flex items-center justify-between">
          <p className="">High Priority Projects</p>
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-4xl font-[600] text-black">15</p>
          <span className="border border-red-300 bg-red-100 text-red-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
            <CircleArrowUp size={12} className="" />
            3.4%
          </span>
        </div>
      </div>
    </div>
  );
}
