import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleArrowUp, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { applicants } from "@/data";

function JobsTable({ jobs }: { jobs: Job[] }) {
  return (
    <div className="border rounded-md overflow-hidden shadow">
      <Table>
        <TableHeader>
          <TableRow className="divide-x bg-gray-100">
            <TableHead>Title</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} className="divide-x">
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {job.applicants.length > 0 && (
                    <div className="flex flex-col items-center w-fit">
                      <span className="font-medium">
                        <div className="flex -space-x-4">
                          {job.applicants.map((assignee, i) => (
                            <Avatar
                              key={i}
                              className="w-8 h-8 border-2 border-background"
                            >
                              <AvatarImage
                                src={applicants[assignee - 1].profilePhoto}
                                alt={applicants[assignee].name}
                              />
                              <AvatarFallback>
                                {applicants[assignee].name[0]}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {job.applicants.length} applicant
                        {job.applicants.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`border text-xs rounded-md p-1 inline-flex items-center gap-2 font-[600] ${
                    job.status === "Active"
                      ? "border-green-300 bg-green-100 text-green-700 "
                      : "border-red-300 bg-red-100 text-red-700 "
                  }`}
                >
                  {job.status}
                </span>
              </TableCell>
              <TableCell>
                {new Date(job.deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default JobsTable;
