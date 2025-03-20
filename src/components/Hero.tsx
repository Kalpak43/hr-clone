import {
  CircleArrowDown,
  CircleArrowUp,
  EllipsisVertical,
  FileText,
  Info,
  List,
  ListFilter,
  MoveRight,
  Plus,
  SquareArrowOutUpRight,
  StretchVertical,
  Table,
  X,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import DateDropdown from "./DateDropdown";
import Graph from "./Graph";
import { useState } from "react";
import KanbanBoard from "./KanbanBoard";

export default function Hero() {
  const [hide, setHide] = useState(false);

  return (
    <div className="hero">
      {/* alert */}
      {!hide && <AlertFlag handleClose={() => setHide(true)} />}

      {/* welcome message */}
      <div className="flex items-center gap-2 justify-between py-4">
        <div>
          <h2 className="text-2xl font-[600]">Hallo, Arnold Smith</h2>
          <p className="text-sm text-gray-700">Wednesday, 06 March 2025</p>
        </div>
        <button className="py-2 px-4 bg-blue-500 rounded-md text-white flex items-center gap-2">
          <FileText size={20} />
          Export
        </button>
      </div>

      {/* stats */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <EmployeeStats />
        <ApplicantStats />
        <AttendanceReport />
        <RevenueStats />
        <AttendanceStats />
      </div>

      {/* tasks */}
      <TasksPanel />
    </div>
  );
}

function AlertFlag({ handleClose }: { handleClose: () => void }) {
  return (
    <div className="flex gap-2 items-center relative p-2 border border-gray-300 rounded-md text-sm max-xl:text-xs pr-8">
      <div className="border-2 border-white shadow-md p-1 aspect-square rounded-full bg-blue-400">
        <Zap size={12} className="text-white" />
      </div>
      <p>
        Optimize your Efficio experience—track attendance, manage teams, and
        streamline HR operations effortlessly!
      </p>

      <Button
        size={"icon"}
        className="absolute inset-y-0 my-auto right-0"
        variant={"ghost"}
        onClick={handleClose}
      >
        <X size={16} className="text-gray-700" />
      </Button>
    </div>
  );
}

function EmployeeStats() {
  return (
    <div className="border border-gray-300 bg-gray-100 rounded-md">
      <div className="border-b border-gray-300 rounded-md p-4 bg-white space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-xs">
            Total Employees{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <Button size={"icon"} variant={"outline"}>
            <EllipsisVertical size={12} className="text-gray-700" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-4xl font-[600] text-black">173</p>
          <span className="border border-green-300 bg-green-100 text-green-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
            <CircleArrowUp size={12} className="" />
            1.8%
          </span>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between  text-xs">
        <p>+16 from last month</p>
        <button className="py-1 px-2 flex items-center gap-2 border border-blue-400 text-blue-400 rounded-md bg-white font-[600]">
          <span className="">Details</span>
          <MoveRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ApplicantStats() {
  return (
    <div className="border border-gray-300 bg-gray-100 rounded-md">
      <div className="border-b border-gray-300 rounded-md p-4 bg-white space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-xs">
            Job Applicant{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <Button size={"icon"} variant={"outline"}>
            <EllipsisVertical size={12} className="text-gray-700" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-4xl font-[600] text-black">983</p>
          <span className="border border-green-300 bg-green-100 text-green-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
            <CircleArrowUp size={12} className="" />
            2.4%
          </span>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between  text-xs">
        <p>+32 from last month</p>
        <button className="py-1 px-2 flex items-center gap-2 border border-blue-400 text-blue-400 rounded-md bg-white font-[600]">
          <span className="">Details</span>
          <MoveRight size={16} />
        </button>
      </div>
    </div>
  );
}

function AttendanceReport() {
  return (
    <div className="overflow-x-auto md:col-span-2 xl:row-span-2 max-xl:order-2 border border-gray-300 rounded-md p-4 space-y-8">
      <div className="flex max-md:flex-col max-md:items-start gap-2 items-center justify-between">
        <p className="">
          Attendance Report{" "}
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </p>
        <div className="flex items-center gap-2">
          <DateDropdown />
          <Button size={"icon"} variant={"outline"}>
            <SquareArrowOutUpRight size={12} className="text-gray-700" />
          </Button>
          <Button size={"icon"} variant={"outline"}>
            <EllipsisVertical size={12} className="text-gray-700" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap max-md:justify-between items-center gap-6">
        <div className="flex items-end gap-2">
          <p className="text-2xl md:text-4xl font-[600] text-black">173</p>
          <p className="text-xs">Total Employee</p>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-2xl md:text-4xl font-[600] text-black">128</p>
          <p className="text-xs">On Time</p>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-2xl md:text-4xl font-[600] text-black">21</p>
          <p className="text-xs">Absent</p>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-2xl md:text-4xl font-[600] text-black">24</p>
          <p className="text-xs">Late</p>
        </div>
      </div>
      <Graph />
    </div>
  );
}

function RevenueStats() {
  return (
    <div className="border border-gray-300 bg-gray-100 rounded-md max-xl:order-1">
      <div className="border-b border-gray-300 rounded-md p-4 bg-white space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-xs">
            Total Revenue{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <Button size={"icon"} variant={"outline"}>
            <EllipsisVertical size={12} className="text-gray-700" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-4xl font-[600] text-black">
            $4.842.<span className="text-gray-400">00</span>
          </p>
          <span className="border border-green-300 bg-green-100 text-green-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
            <CircleArrowUp size={12} className="" />
            4.2%
          </span>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between  text-xs">
        <p>+$3.834.00 from last month</p>
        <button className="py-1 px-2 flex items-center gap-2 border border-blue-400 text-blue-400 rounded-md bg-white font-[600]">
          <span className="">Details</span>
          <MoveRight size={16} />
        </button>
      </div>
    </div>
  );
}

function AttendanceStats() {
  return (
    <div className="border border-gray-300 bg-gray-100 rounded-md max-xl:order-1">
      <div className="border-b border-gray-300 rounded-md p-4 bg-white space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-xs">
            Attendance Rate{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <Button size={"icon"} variant={"outline"}>
            <EllipsisVertical size={12} className="text-gray-700" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-4xl font-[600] text-black">75%</p>
          <span className="border border-red-300 bg-red-100 text-red-700 text-xs rounded-md p-1 flex items-center gap-2 font-[600]">
            <CircleArrowDown size={12} className="" />
            1.7%
          </span>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between  text-xs">
        <p>-6.4% from last month</p>
        <button className="py-1 px-2 flex items-center gap-2 border border-blue-400 text-blue-400 rounded-md bg-white font-[600]">
          <span className="">Details</span>
          <MoveRight size={16} />
        </button>
      </div>
    </div>
  );
}

function TasksPanel() {
  return (
    <div className="border border-gray-300 rounded-md p-4 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="">
            Task{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <div className="flex items-center gap-2">
            <DateDropdown />
            <Button size={"icon"} variant={"outline"}>
              <SquareArrowOutUpRight size={12} className="text-gray-700" />
            </Button>
            <Button size={"icon"} variant={"outline"}>
              <EllipsisVertical size={12} className="text-gray-700" />
            </Button>
          </div>
        </div>
        <div className="flex max-md:flex-col max-md:items-start gap-2 items-center justify-between">
          <div className="flex items-center max-md:justify-between gap-2 text-gray-700 w-full">
            <Button variant={"outline"} className=" bg-gray-100">
              <StretchVertical size={12} />
              <span>Kanban</span>
            </Button>
            <Button variant={"ghost"}>
              <Table size={12} />
              <span>Table</span>
            </Button>
            <Button variant={"ghost"}>
              <List size={12} />
              <span>List View</span>
            </Button>
          </div>
          <Button variant={"outline"} className="ml-auto">
            <ListFilter size={12} />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      {/* <div className="grid md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 aspect-square rounded-full bg-blue-400"></div>
              <p>
                New Request <span className="text-gray-500 ml-2">3</span>
              </p>
            </div>
            <button>
              <EllipsisVertical size={16} className="text-gray-700" />
            </button>
          </div>
          <button className="flex w-full items-center justify-center gap-2  w-fit p-2 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200">
            <Plus size={16} />
          </button>
          <div className="border border-gray-300 rounded-md p-4 space-y-8 divide-y divide-gray-300">
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="py-1 px-2 xl:py-2 xl:px-4 rounded-full bg-blue-500 text-white text-xs">
                    Recruitment
                  </span>
                  <span className="py-1 px-2 xl:py-2 xl:px-4 rounded-full bg-green-500 text-white text-xs">
                    Complaince
                  </span>
                </div>
                <button>
                  <EllipsisVertical size={16} className="text-gray-700" />
                </button>
              </div>
              <h3 className="text-black font-[500] text-lg">
                Employee Onboarding Approval
              </h3>
              <p className="text-gray-500">
                A new onboarding request has been submitted for Jane Smith
                (Marketing Department). HR needs to verify the required
                documents, approve the onboarding process, and schedule an
                introduction meeting with the team.
              </p>
            </div>
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="py-1 px-2 xl:py-2 xl:px-4 rounded-full bg-blue-500 text-white text-xs">
                    Recruitment
                  </span>
                  <span className="py-1 px-2 xl:py-2 xl:px-4 rounded-full bg-green-500 text-white text-xs">
                    Complaince
                  </span>
                </div>
                <button>
                  <EllipsisVertical size={16} className="text-gray-700" />
                </button>
              </div>
              <h3 className="text-black font-[500] text-lg">
                Employee Onboarding Approval
              </h3>
              <p className="text-gray-500">
                A new onboarding request has been submitted for Jane Smith
                (Marketing Department). HR needs to verify the required
                documents, approve the onboarding process, and schedule an
                introduction meeting with the team.
              </p>
            </div>
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="py-1 px-2 xl:py-2 xl:px-4 rounded-full bg-blue-500 text-white text-xs">
                    Recruitment
                  </span>
                  <span className="py-1 px-2 xl:py-2 xl:px-4 rounded-full bg-green-500 text-white text-xs">
                    Complaince
                  </span>
                </div>
                <button>
                  <EllipsisVertical size={16} className="text-gray-700" />
                </button>
              </div>
              <h3 className="text-black font-[500] text-lg">
                Employee Onboarding Approval
              </h3>
              <p className="text-gray-500">
                A new onboarding request has been submitted for Jane Smith
                (Marketing Department). HR needs to verify the required
                documents, approve the onboarding process, and schedule an
                introduction meeting with the team.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 aspect-square rounded-full bg-yellow-400"></div>
              <p>
                In Progress <span className="text-gray-500 ml-2">6</span>
              </p>
            </div>
            <button>
              <EllipsisVertical size={16} className="text-gray-700" />
            </button>
          </div>
          <button className="flex w-full items-center justify-center gap-2  w-fit p-2 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200">
            <Plus size={16} />
          </button>
          <div className="border border-gray-300 rounded-md p-4 space-y-8 divide-y divide-gray-300">
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-pink-500 text-white">
                    Recruitment
                  </span>
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-yellow-500 text-white">
                    Complaince
                  </span>
                </div>
                <button>
                  <EllipsisVertical size={16} className="text-gray-700" />
                </button>
              </div>
              <h3 className="text-black font-[500] text-lg">
                Payroll Processing
              </h3>
              <p className="text-gray-500">
                A new onboarding request has been submitted for Jane Smith
                (Marketing Department). HR needs to verify the required
                documents, approve the onboarding process, and schedule an
                introduction meeting with the team.
              </p>
            </div>
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-pink-500 text-white">
                    Recruitment
                  </span>
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-yellow-500 text-white">
                    Complaince
                  </span>
                </div>
                <button>
                  <EllipsisVertical size={16} className="text-gray-700" />
                </button>
              </div>
              <h3 className="text-black font-[500] text-lg">
                Payroll Processing
              </h3>
              <p className="text-gray-500">
                A new onboarding request has been submitted for Jane Smith
                (Marketing Department). HR needs to verify the required
                documents, approve the onboarding process, and schedule an
                introduction meeting with the team.
              </p>
            </div>
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-pink-500 text-white">
                    Recruitment
                  </span>
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-yellow-500 text-white">
                    Complaince
                  </span>
                </div>
                <button>
                  <EllipsisVertical size={16} className="text-gray-700" />
                </button>
              </div>
              <h3 className="text-black font-[500] text-lg">
                Payroll Processing
              </h3>
              <p className="text-gray-500">
                A new onboarding request has been submitted for Jane Smith
                (Marketing Department). HR needs to verify the required
                documents, approve the onboarding process, and schedule an
                introduction meeting with the team.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 aspect-square rounded-full bg-green-400"></div>
              <p>
                Companies <span className="text-gray-500 ml-2">12</span>
              </p>
            </div>
            <button>
              <EllipsisVertical size={16} className="text-gray-700" />
            </button>
          </div>
          <button className="flex w-full items-center justify-center gap-2  w-fit p-2 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200">
            <Plus size={16} />
          </button>
          <div className="border border-gray-300 rounded-md p-4 space-y-8 divide-y divide-gray-300">
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-purple-500 text-white">
                    Recruitment
                  </span>
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-blue-500 text-white">
                    Complaince
                  </span>
                </div>
                <button>
                  <EllipsisVertical size={16} className="text-gray-700" />
                </button>
              </div>
              <h3 className="text-black font-[500] text-lg">
                Employee Satisfaction Survey
              </h3>
              <p className="text-gray-500">
                A new onboarding request has been submitted for Jane Smith
                (Marketing Department). HR needs to verify the required
                documents, approve the onboarding process, and schedule an
                introduction meeting with the team.
              </p>
            </div>
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-purple-500 text-white">
                    Recruitment
                  </span>
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-blue-500 text-white">
                    Complaince
                  </span>
                </div>
                <button>
                  <EllipsisVertical size={16} className="text-gray-700" />
                </button>
              </div>
              <h3 className="text-black font-[500] text-lg">
                Employee Satisfaction Survey
              </h3>
              <p className="text-gray-500">
                A new onboarding request has been submitted for Jane Smith
                (Marketing Department). HR needs to verify the required
                documents, approve the onboarding process, and schedule an
                introduction meeting with the team.
              </p>
            </div>
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-purple-500 text-white">
                    Recruitment
                  </span>
                  <span className="py-1 px-2 xl:py-2 xl:px-4 text-xs rounded-full bg-blue-500 text-white">
                    Complaince
                  </span>
                </div>
                <button>
                  <EllipsisVertical size={16} className="text-gray-700" />
                </button>
              </div>
              <h3 className="text-black font-[500] text-lg">
                Employee Satisfaction Survey
              </h3>
              <p className="text-gray-500">
                A new onboarding request has been submitted for Jane Smith
                (Marketing Department). HR needs to verify the required
                documents, approve the onboarding process, and schedule an
                introduction meeting with the team.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <KanbanBoard />
    </div>
  );
}
