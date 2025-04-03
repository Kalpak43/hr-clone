import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { applicants } from "@/data";

function JobsTable({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <>
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
                      <div className="">
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
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedJob(job)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Job Details Modal */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="sm:max-w-[625px]">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Status</h4>
                    <span
                      className={`border text-xs rounded-md p-1 inline-flex items-center gap-2 font-[600] ${
                        selectedJob.status === "Active"
                          ? "border-green-300 bg-green-100 text-green-700 "
                          : "border-red-300 bg-red-100 text-red-700 "
                      }`}
                    >
                      {selectedJob.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Deadline</h4>
                    <p className="text-sm">
                      {new Date(selectedJob.deadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Applicants</h4>
                    <p className="text-sm">
                      {selectedJob.applicants.length} applicant
                      {selectedJob.applicants.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Job ID</h4>
                    <p className="text-sm">{selectedJob.id}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default JobsTable;
