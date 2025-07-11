import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  CircleDot,
  CircleDotDashed,
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
import { renderPriorityBadge } from "@/pages/TasksPage";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ListView({
  tasks,
  changeTaskStatus,
}: {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  changeTaskStatus: (
    id: number,
    status: "pending" | "in progress" | "completed"
  ) => void;
}) {
  // Filter tasks by status
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  // State for each collapsible section
  const [isPendingOpen, setIsPendingOpen] = useState(true);
  const [isInProgressOpen, setIsInProgressOpen] = useState(true);
  const [isCompletedOpen, setIsCompletedOpen] = useState(true);

  return (
    <div className="space-y-4">
      <Collapsible
        open={isPendingOpen}
        onOpenChange={setIsPendingOpen}
        className="border border-gray-300 rounded-md"
      >
        <div className="p-4">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <CircleDotDashed className="text-gray-500" size={18} />
                <h3 className="font-medium">Pending</h3>
                <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
                  {pendingTasks.length} tasks
                </span>
              </div>
              {isPendingOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="px-4 pb-4">
            {pendingTasks.length > 0 ? (
              <TaskTable
                tasks={pendingTasks}
                changeStatusOf={(id: number) => {
                  changeTaskStatus(id, "in progress");
                }}
              />
            ) : (
              <p className="text-gray-500 text-center py-4">No pending tasks</p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* In Progress Tasks Section */}
      <Collapsible
        open={isInProgressOpen}
        onOpenChange={setIsInProgressOpen}
        className="border border-gray-300 rounded-md"
      >
        <div className="p-4">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <CircleDot className="text-yellow-500" size={18} />
                <h3 className="font-medium">In Progress</h3>
                <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
                  {inProgressTasks.length} tasks
                </span>
              </div>
              {isInProgressOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="px-4 pb-4">
            {inProgressTasks.length > 0 ? (
              <TaskTable
                tasks={inProgressTasks}
                changeStatusOf={(id: number) => {
                  changeTaskStatus(id, "completed");
                }}
              />
            ) : (
              <p className="text-gray-500 text-center py-4">
                No tasks in progress
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Completed Tasks Section */}
      <Collapsible
        open={isCompletedOpen}
        onOpenChange={setIsCompletedOpen}
        className="border border-gray-300 rounded-md"
      >
        <div className="p-4">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <CircleCheck className="text-green-500" size={18} />
                <h3 className="font-medium">Completed</h3>
                <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
                  {completedTasks.length} tasks
                </span>
              </div>
              {isCompletedOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="px-4 pb-4">
            {completedTasks.length > 0 ? (
              <TaskTable
                tasks={completedTasks}
                changeStatusOf={(id: number) => {
                  changeTaskStatus(id, "completed");
                }}
              />
            ) : (
              <p className="text-gray-500 text-center py-4">
                No completed tasks
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export function TaskTable({
  tasks,
  changeStatusOf,
}: {
  tasks: TaskType[];
  changeStatusOf: (id: number) => void;
}) {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="divide-x bg-gray-100 [&_th]:text-center">
            <TableHead></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignees</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="divide-x">
              <TableCell>
                <div className="flex items-center justify-center px-2">
                  <Checkbox
                    onCheckedChange={() => changeStatusOf(task.id)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    disabled={task.status === "completed"}
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <p className="w-[250px]">{task.title}</p>
              </TableCell>
              <TableCell className="text-gray-600 text-xs">
                {task.description}
              </TableCell>
              <TableCell>{task.dueDate || "-"}</TableCell>
              <TableCell>{renderPriorityBadge(task.priority)}</TableCell>
              <TableCell>
                <div className="flex -space-x-4">
                  {task.assignees.map((assignee, i) => (
                    <Avatar
                      key={i}
                      className="w-8 h-8 border-2 border-background"
                    >
                      <AvatarImage src={assignee.image} alt={assignee.name} />
                      <AvatarFallback>{assignee.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {task.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-900 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
