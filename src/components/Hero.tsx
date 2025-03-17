import {
  CircleArrowDown,
  CircleArrowUp,
  EllipsisVertical,
  FileText,
  Info,
  MoveRight,
  SquareArrowOutUpRight,
  X,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import DateDropdown from "./DateDropdown";

export default function Hero() {
  return (
    <div className="p-4 space-y-4 text-sm">
      {/* alert */}
      <div className="flex gap-2 items-center relative p-2 border border-gray-300 rounded-md text-sm">
        <div className="border-2 border-white shadow-md p-1 aspect-square rounded-full bg-blue-400">
          <Zap size={12} className="text-white" />
        </div>
        <p>
          Optimize your Efficio experience—track attendance, manage teams, and
          streamline HR operations effortlessly!
        </p>

        <button className="absolute inset-y-0 my-auto right-0 m-4">
          <X size={16} className="text-gray-700" />
        </button>
      </div>

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
      <div className="grid grid-cols-4 gap-4">
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
        <div className="col-span-2 row-span-2 border border-gray-300 rounded-md p-4 space-y-8">
          <div className="flex items-center justify-between">
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
          <div className="flex items-center gap-6">
            <div className="flex items-end gap-2">
              <p className="text-4xl font-[600] text-black">173</p>
              <p className="text-xs">Total Employee</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-[600] text-black">128</p>
              <p className="text-xs">On Time</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-[600] text-black">21</p>
              <p className="text-xs">Absent</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-[600] text-black">24</p>
              <p className="text-xs">Late</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 bg-gray-100 rounded-md">
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
        <div className="border border-gray-300 bg-gray-100 rounded-md">
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
      </div>

      {/* tasks */}
      <div className="border border-gray-300 rounded-md p-4 space-y-8">
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
        <div className="flex items-center gap-6">
          <div className="flex items-end gap-2">
            <p className="text-4xl font-[600] text-black">173</p>
            <p className="text-xs">Total Employee</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-[600] text-black">128</p>
            <p className="text-xs">On Time</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-[600] text-black">21</p>
            <p className="text-xs">Absent</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-[600] text-black">24</p>
            <p className="text-xs">Late</p>
          </div>
        </div>
      </div>
    </div>
  );
}
