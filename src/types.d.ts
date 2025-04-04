// types.ts
interface Employee {
  id: number;
  name: string;
  position: string;
  contact: string;
  email: string;
  image: string;
  children?: Employee[];
}

interface EmailType {
  id: number;
  title: string;
  createdAt: Date;
  createdBy: string;
  status: null | "approved" | "rejected";
  approvedBy: string | null;
  content: string;
  comment: string;
  requestFor: string;
  read: boolean;
}

type GroupType = "department" | "organization" | "team";

interface PostType {
  content: string;
  image?: string;
  type: "poll" | "post" | "praise";
  options?: string[];
  created_at: number;
  postedTo: GroupType;
  anonymus: boolean;
  expiresOn?: number;
  mentions?: { name: string; image: string }[];
  attachments?: File[];
  badge?: string;
  project?: string;
}

interface FEmployee {
  profile: File | null;
  work_email: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  phone_number: string;
  gender: "male" | "female" | "other";
  DOB: string;
  job_title: string;
  department: string;
  type: "internship" | "full-time" | "part-time";
  level: string;
  DOJ: string;
  location: string;
  salary: number;
  frequency: string;
  supervisor: string;
  shift: string;
  leaves: {
    annual: number;
    sick: number;
  };
  password: string;
}

interface EmployeeWithId extends FEmployee {
  id: number;
  profile: string;
  uuid: string;
  created_at: string;
}

interface EditableEmployee extends EmployeeWithId {
  profile: string | File;
}

interface OrgNode {
  id: number;
  name: string;
  position: string;
  department: string;
  contact: string;
  email: string;
  image: string;
  children: OrgNode[];
}

interface TaskType {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  assignees: {
    name: string;
    image: string;
  }[];
  tags: string[];
}

interface SocialLinks {
  linkedIn: string;
  github?: string;
  kaggle?: string;
  dribbble?: string;
}

interface Applicant {
  id: number;
  profilePhoto: string;
  name: string;
  jobAppliedFor: string;
  appliedDate: string; // ISO date string
  socials: SocialLinks;
  email: string;
  contact: string;
  location: string;
  education: string;
  interviewStep: number; // e.g., 1, 2, 3, etc.
  resumeUrl: string;
}

interface Job {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Expired";
  deadline: string; // Format: YYYY-MM-DD
  postedOn: string;
  applicants: number[]; // Array of applicant IDs
  skills: string[]; // Array of skills required for the job
  qualifications: string[]; // Array of qualifications required for the job
}

interface Interview {
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  participant: {
    id: number;
    name: string;
    profilePhoto: string;
    email: string;
    jobAppliedFor: string;
  };
}

interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  status: "Not Started" | "Planning" | "In Progress" | "Completed" | "Delayed";
  progress: number; // Percentage (0-100)
  priority: "Critical" | "High" | "Medium" | "Low";
  team_id: number;
  budget: number; // In currency units
}

interface TeamMember {
  name: string;
  role: string;
}

interface Team {
  team_id: number;
  members: TeamMember[];
}
