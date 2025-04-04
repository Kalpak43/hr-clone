import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 divide-x">
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className=" divide-x">
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>
                {new Date(project.start_date).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell>
                {new Date(project.end_date).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell>
                <span
                  className={`border text-xs rounded-md p-1 inline-flex items-center gap-2 font-[600] ${
                    statusColors[project.status] ||
                    "border-gray-300 bg-gray-100 text-gray-700"
                  }`}
                >
                  {project.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 items-center">
                  <Progress value={project.progress} />
                  <p className="text-xs text-gray-500">{project.progress} %</p>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`border text-xs rounded-md p-1 inline-flex items-center gap-2 font-[600] ${
                    priorityColors[project.priority] ||
                    "border-gray-300 bg-gray-100 text-gray-700"
                  }`}
                >
                  {project.priority}
                </span>
              </TableCell>
              <TableCell>₹{project.budget.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProjectsTable;

const statusColors: Record<string, string> = {
  "In Progress": "border-blue-300 bg-blue-100 text-blue-700",
  "Not Started": "border-yellow-300 bg-yellow-100 text-yellow-700",
  Completed: "border-green-300 bg-green-100 text-green-700",
  Cancelled: "border-red-300 bg-red-100 text-red-700",
};

const priorityColors: Record<string, string> = {
  Critical: "border-red-400 bg-red-100 text-red-700",
  High: "border-orange-600 bg-orange-100 text-orange-700",
  Medium: "border-yellow-400 bg-yellow-100 text-yellow-700",
  Low: "border-green-400 bg-green-100 text-green-700",
};
