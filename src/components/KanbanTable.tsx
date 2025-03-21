import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { initialColumns } from "./KanbanBoard";

export default function KanbanTable() {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="divide-x">
            <TableHead>Task ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            {/* <TableHead>Status</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialColumns.flatMap((column) =>
            column.tasks.map((task) => (
              <TableRow key={task.id} className="divide-x">
                <TableCell className="max-w-[200px] px-2">{task.id}</TableCell>
                <TableCell className="max-w-[200px] px-2">{task.title}</TableCell>
                <TableCell className="max-w-[200px] px-2">
                  {task.description}
                </TableCell>
                {/* <TableCell>{column.status}</TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
