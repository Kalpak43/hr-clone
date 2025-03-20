import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Column } from "./KanbanBoard";
import { KanbanTask } from "./KanbanTask";
import { EllipsisVertical, Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  column: Column;
  onAddTask: () => void;
}

export function KanbanColumn({ column, onAddTask }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 aspect-square rounded-full ${column.color}`}
          ></div>
          <p>
            {column.title}{" "}
            <span className="text-gray-500 ml-2">{column.tasks.length}</span>
          </p>
        </div>
        <button>
          <EllipsisVertical size={16} className="text-gray-700" />
        </button>
      </div>

      <button
        onClick={onAddTask}
        className="flex w-full items-center justify-center gap-2 p-2 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <Plus size={16} />
      </button>

      <div
        ref={setNodeRef}
        className="border border-gray-300 rounded-md p-4 space-y-8 divide-y divide-gray-300 min-h-[200px]"
      >
        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <KanbanTask key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
