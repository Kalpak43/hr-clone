import DateDropdown from "@/components/DateDropdown";
import { Button } from "@/components/ui/button";
import { dummyTasks } from "@/data";
import { Info, List, Plus, StretchVertical } from "lucide-react";
import { useEffect, useState } from "react";

import { ListView } from "@/components/tasks/ListView";
import BoardView from "@/components/tasks/BoardView";
import AddTaskModal from "@/components/tasks/AddTaskModal";

function TasksPage() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>(dummyTasks as TaskType[]);
  const [viewMode, setViewMode] = useState<"list" | "board">("board");
  const [filterDate, setFilterDate] = useState<Date>(new Date());

  const changeTaskStatus = (
    taskId: number,
    status: "pending" | "in progress" | "completed"
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (!task.dueDate) return false; // Exclude tasks with no due date

    const taskDate = new Date(task.dueDate);

    // Compare dates without time component
    return taskDate.toDateString() === filterDate.toDateString();
  }) as TaskType[];

  function addTask(newTask: TaskType) {
    setTasks((x) => [...x, newTask]);
  }

  return (
    <div className="hero h-full">
      <div className="border border-gray-300 rounded-md p-4 space-y-8 h-full overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-lg">
              Tasks{" "}
              <span className="ml-4">
                <Info className="inline text-gray-700" size={16} />
              </span>
            </p>
            <div className="flex items-center gap-2">
              <DateDropdown
                onChange={(x) => {
                  setFilterDate(x);
                }}
              />
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

            <Button
              className="ml-auto bg-blue-400 hover:bg-blue-500"
              onClick={() => setOpen(true)}
            >
              <Plus size={12} />
              <span>Add Task</span>
            </Button>
          </div>
        </div>

        <div>
          {
            {
              board: (
                <BoardView
                  tasks={filteredTasks}
                  setTasks={setTasks}
                  changeTaskStatus={changeTaskStatus}
                />
              ),
              list: (
                <ListView
                  tasks={filteredTasks}
                  setTasks={setTasks}
                  changeTaskStatus={changeTaskStatus}
                />
              ),
            }[viewMode]
          }
        </div>
      </div>

      <AddTaskModal
        open={open}
        setOpen={setOpen}
        addTask={addTask}
        tasks={tasks}
      />
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
