import {
  CircleCheck,
  CircleDot,
  CircleDotDashed,
  EllipsisVertical,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function BoardView({
  tasks,
  setTasks,
}: {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) {
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className=" space-y-4">
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <CircleDotDashed className="text-gray-500" size={18} />
            <h3 className="font-medium">Pending</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
              {pendingTasks.length} tasks
            </span>
          </div>
        </div>
        <div className="space-y-2">
          {pendingTasks.length > 0 &&
            pendingTasks.map((task) => <TaskCard task={task} />)}
        </div>
      </div>
      <div className=" space-y-4">
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <CircleDot className="text-yellow-500" size={18} />
            <h3 className="font-medium">In Progress</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
              {inProgressTasks.length} tasks
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {inProgressTasks.length > 0 &&
            inProgressTasks.map((task) => <TaskCard task={task} />)}
        </div>
      </div>
      <div className=" space-y-4">
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <CircleCheck className="text-green-500" size={18} />
            <h3 className="font-medium">Completed</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">
              {completedTasks.length} tasks
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {completedTasks.length > 0 &&
            completedTasks.map((task) => <TaskCard task={task} />)}
        </div>
      </div>
    </div>
  );
}

export default BoardView;

export function TaskCard({ task }: { task: TaskType }) {
  return (
    <div className="border border-gray-300 rounded-md p-2 space-y-2 relative">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute top-0 right-0"
      >
        <EllipsisVertical />
      </Button>
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
      <p className="font-semibold">{task.title}</p>
      <p className="text-xs text-gray-600">{task.description}</p>
      {task.dueDate && (
        <p className="text-gray-700">
          Due:
          <span className="italic">{task.dueDate}</span>
        </p>
      )}
      <div className="flex items-center gap-2">
        <img
          src={task.assignees[0].image}
          alt={task.assignees[0].name}
          className="w-6 h-6 rounded-full"
        />
      </div>
    </div>
  );
}
