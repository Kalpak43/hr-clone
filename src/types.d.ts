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
