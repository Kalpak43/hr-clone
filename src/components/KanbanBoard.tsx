"use client";

import { useState } from "react";
// @ts-ignore
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { EllipsisVertical, Plus } from "lucide-react";

// Define types for our data structure
export type TaskTag = {
  id: string;
  name: string;
  color: string;
};

export type KanbanCard = {
  id: string;
  title: string;
  description: string;
  tags: TaskTag[];
};

export type KanbanColumn = {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
};

export type BoardData = {
  columns: KanbanColumn[];
};

// Sample data
const initialBoard: BoardData = {
  columns: [
    {
      id: "new",
      title: "New Request",
      color: "bg-blue-400",
      cards: [
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
      cards: [
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
      cards: [
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
  ],
};

function KanbanBoard() {
  const [board, setBoard] = useState<BoardData>(initialBoard);

  // Handle adding a new card to a column
  const handleAddCard = (columnId: string) => {
    const newBoard = { ...board };
    const column = newBoard.columns.find((col) => col.id === columnId);

    if (column) {
      const newCard: KanbanCard = {
        id: `task-${Date.now()}`,
        title: "New Task",
        description: "Add description here",
        tags: [{ id: `tag-${Date.now()}`, name: "New", color: "bg-gray-500" }],
      };

      column.cards.push(newCard);
      setBoard(newBoard);
    }
  };

  // Custom components for react-kanban
  const renderCard = (card: KanbanCard) => (
    <div className="space-y-4 pb-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap gap-2">
          {card.tags.map((tag) => (
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
      <h3 className="text-black font-[500] text-lg">{card.title}</h3>
      <p className="text-gray-500">{card.description}</p>
    </div>
  );

  const renderColumnHeader = (column: KanbanColumn) => (
    <div className="space-y-2 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 aspect-square rounded-full ${column.color}`}
          ></div>
          <p>
            {column.title}{" "}
            <span className="text-gray-500 ml-2">{column.cards.length}</span>
          </p>
        </div>
        <button>
          <EllipsisVertical size={16} className="text-gray-700" />
        </button>
      </div>
      <button
        onClick={() => handleAddCard(column.id)}
        className="flex w-full items-center justify-center gap-2 p-2 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <Plus size={16} />
      </button>
    </div>
  );

  return (
    <div className="max-h-[600px] overflow-y-auto p-4">
      <Board initialBoard={board} />
    </div>
  );
}

export default KanbanBoard;
