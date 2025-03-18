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
