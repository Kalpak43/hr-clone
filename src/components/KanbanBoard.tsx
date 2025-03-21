import { useState } from "react";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";

// Define types for our data structure
export type TaskTag = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  tags: TaskTag[];
};

export type Column = {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
};

// Sample data
export const initialColumns: Column[] = [
  {
    id: "new",
    title: "New Request",
    color: "bg-blue-400",
    tasks: [
      {
        id: "task-1",
        title: "Employee Onboarding Approval",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: [
          { id: "tag-1", name: "Recruitment", color: "bg-blue-500" },
          { id: "tag-2", name: "Compliance", color: "bg-green-500" },
        ],
      },
      {
        id: "task-2",
        title: "Employee Onboarding Approval",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: [
          { id: "tag-1", name: "Recruitment", color: "bg-blue-500" },
          { id: "tag-2", name: "Compliance", color: "bg-green-500" },
        ],
      },
      {
        id: "task-3",
        title: "Employee Onboarding Approval",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: [
          { id: "tag-1", name: "Recruitment", color: "bg-blue-500" },
          { id: "tag-2", name: "Compliance", color: "bg-green-500" },
        ],
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    color: "bg-yellow-400",
    tasks: [
      {
        id: "task-4",
        title: "Payroll Processing",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: [
          { id: "tag-3", name: "Recruitment", color: "bg-pink-500" },
          { id: "tag-4", name: "Compliance", color: "bg-yellow-500" },
        ],
      },
      {
        id: "task-5",
        title: "Payroll Processing",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: [
          { id: "tag-3", name: "Recruitment", color: "bg-pink-500" },
          { id: "tag-4", name: "Compliance", color: "bg-yellow-500" },
        ],
      },
      {
        id: "task-6",
        title: "Payroll Processing",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: [
          { id: "tag-3", name: "Recruitment", color: "bg-pink-500" },
          { id: "tag-4", name: "Compliance", color: "bg-yellow-500" },
        ],
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    color: "bg-green-400",
    tasks: [
      {
        id: "task-7",
        title: "Employee Satisfaction Survey",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: [
          { id: "tag-5", name: "Recruitment", color: "bg-purple-500" },
          { id: "tag-6", name: "Compliance", color: "bg-blue-500" },
        ],
      },
      {
        id: "task-8",
        title: "Employee Satisfaction Survey",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: [
          { id: "tag-5", name: "Recruitment", color: "bg-purple-500" },
          { id: "tag-6", name: "Compliance", color: "bg-blue-500" },
        ],
      },
      {
        id: "task-9",
        title: "Employee Satisfaction Survey",
        description:
          "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
        tags: [
          { id: "tag-5", name: "Recruitment", color: "bg-purple-500" },
          { id: "tag-6", name: "Compliance", color: "bg-blue-500" },
        ],
      },
    ],
  },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  // Handle adding a new task to a column
  const handleAddTask = (columnId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === columnId) {
          const newTaskId = `task-${Date.now()}`;
          const newTask: Task = {
            id: newTaskId,
            title: "New Task",
            description: "Add description here",
            tags: [
              { id: `tag-${Date.now()}`, name: "New", color: "bg-gray-500" },
            ],
          };
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      })
    );
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Find which column the task is moving from
    let sourceColumnIndex = -1;
    let sourceTaskIndex = -1;

    // Find the source column and task
    columns.forEach((column, colIndex) => {
      const taskIndex = column.tasks.findIndex((task) => task.id === activeId);
      if (taskIndex !== -1) {
        sourceColumnIndex = colIndex;
        sourceTaskIndex = taskIndex;
      }
    });

    if (sourceColumnIndex === -1) return;

    // Check if we're dropping onto a task or a column
    const isOverATask = columns.some((column) =>
      column.tasks.some((task) => task.id === overId)
    );

    if (isOverATask) {
      // Find the destination column and task
      let destColumnIndex = -1;
      let destTaskIndex = -1;

      columns.forEach((column, colIndex) => {
        const taskIndex = column.tasks.findIndex((task) => task.id === overId);
        if (taskIndex !== -1) {
          destColumnIndex = colIndex;
          destTaskIndex = taskIndex;
        }
      });

      if (destColumnIndex === -1) return;

      setColumns((prevColumns) => {
        const newColumns = JSON.parse(JSON.stringify(prevColumns)) as Column[];

        // Get the task we're moving
        const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(
          sourceTaskIndex,
          1
        );

        // Insert it at the new position
        newColumns[destColumnIndex].tasks.splice(destTaskIndex, 0, movedTask);

        return newColumns;
      });
    } else {
      // We're dropping directly onto a column
      // Find which column we're dropping onto
      const destColumnIndex = columns.findIndex(
        (column) => column.id === overId
      );

      if (destColumnIndex === -1) return;

      setColumns((prevColumns) => {
        const newColumns = JSON.parse(JSON.stringify(prevColumns)) as Column[];

        // Get the task we're moving
        const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(
          sourceTaskIndex,
          1
        );

        // Add it to the end of the destination column
        newColumns[destColumnIndex].tasks.push(movedTask);

        return newColumns;
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      // Add these options to improve drag behavior
      modifiers={[]}
    >
      <div className="grid md:grid-cols-3 gap-4 overflow-y-auto p-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onAddTask={() => handleAddTask(column.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
