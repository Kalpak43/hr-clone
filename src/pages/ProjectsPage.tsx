import BudgetAllocation from "@/components/projects/BudgetAllocation";
import CompletionProgress from "@/components/projects/CompletionProgress";
import ProjectStatus from "@/components/projects/ProjectStatus";
import { CircleArrowUp, Info } from "lucide-react";

function ProjectsPage() {
  return (
    <div className="hero">
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

      <CompletionProgress />

      <div className="grid grid-cols-5 gap-4">
        <ProjectStatus />
        <BudgetAllocation />
      </div>
    </div>
  );
}

export default ProjectsPage;
