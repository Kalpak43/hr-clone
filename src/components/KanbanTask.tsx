import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "./KanbanBoard";
import { EllipsisVertical } from "lucide-react";

interface KanbanTaskProps {
  task: Task;
}

export function KanbanTask({ task }: KanbanTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="space-y-4 pb-4 pt-4 cursor-grab active:cursor-grabbing bg-white"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap gap-2">
          {task.tags.map((tag) => (
            <span
              key={tag.id}
              className={`py-1 px-2 xl:py-2 xl:px-4 rounded-full ${tag.color} text-white text-xs`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <button>
          <EllipsisVertical size={16} className="text-gray-700" />
        </button>
      </div>
      <h3 className="text-black font-[500] text-lg">{task.title}</h3>
      <p className="text-gray-500">{task.description}</p>
    </div>
  );
}
