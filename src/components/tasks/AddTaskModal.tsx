import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { employeeList } from "@/data";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { Input } from "../ui/input";

function AddTaskModal({
  open,
  setOpen,
  addTask,
  tasks,
}: {
  tasks: TaskType[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTask: (task: TaskType) => void;
}) {
  const [newTask, setNewTask] = useState<TaskType>({
    id: tasks.length,
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
    assignees: [],
    tags: [],
  } as TaskType);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter employeeList based on searchTerm
  const filteredEmployees = employeeList.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tags = [
    "UI/UX",
    "design",
    "figma",
    "bug",
    "authentication",
    "backend",
    "documentation",
    "API",
    "updates",
    "database",
    "performance",
    "optimization",
    "deployment",
    "analytics",
    "dashboard",
  ];

  const priorities = ["low", "medium", "high"];
  const statuses = ["pending", "in progress", "completed"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return; // Basic validation

    // Generate a unique ID (in a real app, this would come from the backend)
    const taskWithId = {
      ...newTask,
      id: Math.floor(Math.random() * 10000),
    };

    console.log(newTask);

    addTask(taskWithId);
    setOpen(false);
    // Reset form
    setNewTask({
      id: -1,
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      status: "",
      assignees: [],
      tags: [],
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogDescription>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              <div>
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((x) => ({
                      ...x,
                      title: e.target.value,
                    }))
                  }
                  className="text-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask((x) => ({
                      ...x,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md text-black min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dueDate">Due Date</label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask((x) => ({
                        ...x,
                        dueDate: e.target.value,
                      }))
                    }
                    className="text-black"
                  />
                </div>

                <div>
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask((x) => ({
                        ...x,
                        priority: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md text-black"
                  >
                    <option value="">Select Priority</option>
                    {priorities.map((priority) => (
                      <option
                        key={priority}
                        value={priority}
                        className="capitalize"
                      >
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label>Status</label>
                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask((x) => ({
                      ...x,
                      status: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md text-black"
                >
                  <option value="">Select Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status} className="capitalize">
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label>Assign to</label>
                <div className="border border-gray-300 bg-gray-50 rounded-md p-2 flex items-center relative">
                  <input
                    type="text"
                    className="text-sm pl-2 min-w-xs rounded-md focus:outline-none w-full"
                    placeholder="Search Employee..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() =>
                      setTimeout(() => {
                        setIsFocused(true);
                      }, 100)
                    }
                    onBlur={() =>
                      setTimeout(() => {
                        setIsFocused(false);
                      }, 100)
                    }
                  />
                  {isFocused && (
                    <div className="search-panel absolute top-full inset-x-0 z-40 mt-2 max-h-[200px] overflow-y-auto border border-gray-300 rounded-md bg-white shadow-sm p-4">
                      {filteredEmployees.length > 0 ? (
                        <ul>
                          {filteredEmployees.map((employee, i) => (
                            <li key={i}>
                              <Button
                                type="button"
                                className="w-full justify-start"
                                variant={"ghost"}
                                onClick={() => {
                                  setNewTask((x) => ({
                                    ...x,
                                    assignees: x.assignees.some(
                                      (emp) => emp.name === employee.name
                                    )
                                      ? x.assignees
                                      : [...x.assignees, employee],
                                  }));
                                  setSearchTerm("");
                                }}
                              >
                                <span className="w-6 border rounded-full aspect-square">
                                  <img
                                    src={employee.image}
                                    alt={employee.name}
                                    className="rounded-full"
                                  />
                                </span>
                                {employee.name}
                                {newTask.assignees.some(
                                  (emp) => emp.name === employee.name
                                ) && (
                                  <span>
                                    <Check className="text-blue-400" />
                                  </span>
                                )}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No employees found.</p>
                      )}
                    </div>
                  )}
                </div>
                {newTask.assignees.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {newTask.assignees.map((employee, i) => (
                      <button
                        key={i}
                        type="button"
                        className="flex items-center gap-2 border p-1 rounded-full bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setNewTask((prev) => ({
                            ...prev,
                            assignees: prev.assignees.filter(
                              (emp) => emp.name !== employee.name
                            ),
                          }));
                        }}
                      >
                        <div className="w-6 aspect-square rounded-full border overflow-clip">
                          <img
                            src={employee.image}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-700 font-[600]">
                          {employee.name}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label>Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`px-3 py-1 rounded-full text-sm ${
                        newTask.tags.includes(tag)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => {
                        setNewTask((prev) => ({
                          ...prev,
                          tags: prev.tags.includes(tag)
                            ? prev.tags.filter((t) => t !== tag)
                            : [...prev.tags, tag],
                        }));
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogDescription>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit"className=" bg-blue-400 hover:bg-blue-500">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
