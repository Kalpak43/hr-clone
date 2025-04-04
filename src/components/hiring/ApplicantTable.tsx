import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function ApplicantTable({ applicants }: { applicants: Applicant[] }) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 divide-x">
            <TableHead>Name</TableHead>
            <TableHead>Job Applied For</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((applicant) => (
            <TableRow key={applicant.id} className="divide-x">
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8 border-background">
                    <AvatarImage
                      src={applicant.profilePhoto}
                      alt={applicant.name}
                    />
                    <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{applicant.name}</span>
                </div>
              </TableCell>
              <TableCell>{applicant.jobAppliedFor}</TableCell>
              <TableCell>
                {new Date(applicant.appliedDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{applicant.location}</TableCell>
              <TableCell>{applicant.email}</TableCell>
              <TableCell>{applicant.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantTable;
