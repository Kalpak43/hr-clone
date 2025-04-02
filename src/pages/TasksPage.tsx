import DateDropdown from "@/components/DateDropdown";
import { Button } from "@/components/ui/button";
import { dummyTasks } from "@/data";
import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  CircleDot,
  CircleDotDashed,
  EllipsisVertical,
  Info,
  List,
  ListFilter,
  SquareArrowOutUpRight,
  StretchVertical,
  Table as TableLogo,
} from "lucide-react";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ListView } from "@/components/tasks/ListView";
import BoardView from "@/components/tasks/BoardView";

function TasksPage() {
  const [tasks, setTasks] = useState<TaskType[]>(dummyTasks as TaskType[]);
  const [viewMode, setViewMode] = useState<"list" | "board">("board");

  return (
    <div className="hero">
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
              <Button
                variant={viewMode == "board" ? "outline" : "ghost"}
                className={viewMode == "board" ? " bg-gray-100" : ""}
                onClick={() => setViewMode("board")}
              >
                <StretchVertical size={12} />
                <span>Kanban</span>
              </Button>
              <Button
                variant={viewMode == "list" ? "outline" : "ghost"}
                onClick={() => setViewMode("list")}
                className={viewMode == "list" ? " bg-gray-100" : ""}
              >
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

        <div>
          {
            {
              board: <BoardView tasks={tasks} setTasks={setTasks} />,
              list: <ListView tasks={tasks} setTasks={setTasks} />,
            }[viewMode]
          }
        </div>
      </div>
    </div>
  );
}

export default TasksPage;

export const renderPriorityBadge = (priority: string) => {
  const priorityClasses = {
    critical: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        priorityClasses[priority as keyof typeof priorityClasses] ||
        "bg-gray-100 text-gray-800"
      }`}
    >
      {priority}
    </span>
  );
};
