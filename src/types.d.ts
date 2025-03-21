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
  read: boolean
}
