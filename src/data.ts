export const orgTree = {
  id: 1,
  name: "Alice Johnson",
  position: "CEO",
  department: "Executive",
  contact: "123-456-7890",
  email: "alice.johnson@example.com",
  image: "https://i.pravatar.cc/150?img=1",
  children: [
    {
      id: 2,
      name: "Bob Smith",
      position: "CTO",
      department: "Technology",
      contact: "234-567-8901",
      email: "bob.smith@example.com",
      image: "https://i.pravatar.cc/150?img=2",
      children: [
        {
          id: 3,
          name: "Charlie Davis",
          position: "Engineering Manager",
          department: "Engineering",
          contact: "345-678-9012",
          email: "charlie.davis@example.com",
          image: "https://i.pravatar.cc/150?img=3",
          children: [
            {
              id: 4,
              name: "David White",
              position: "Software Engineer",
              department: "Engineering",
              contact: "456-789-0123",
              email: "david.white@example.com",
              image: "https://i.pravatar.cc/150?img=4",
              children: [],
            },
            {
              id: 5,
              name: "Eve Brown",
              position: "Software Engineer",
              department: "Engineering",
              contact: "567-890-1234",
              email: "eve.brown@example.com",
              image: "https://i.pravatar.cc/150?img=5",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 6,
      name: "Sophia Green",
      position: "CFO",
      department: "Finance",
      contact: "678-901-2345",
      email: "sophia.green@example.com",
      image: "https://i.pravatar.cc/150?img=6",
      children: [
        {
          id: 7,
          name: "Liam Black",
          position: "Finance Manager",
          department: "Finance",
          contact: "789-012-3456",
          email: "liam.black@example.com",
          image: "https://i.pravatar.cc/150?img=7",
          children: [
            {
              id: 8,
              name: "Emma Wilson",
              position: "Accountant",
              department: "Finance",
              contact: "890-123-4567",
              email: "emma.wilson@example.com",
              image: "https://i.pravatar.cc/150?img=8",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 9,
      name: "Michael King",
      position: "COO",
      department: "Operations",
      contact: "901-234-5678",
      email: "michael.king@example.com",
      image: "https://i.pravatar.cc/150?img=9",
      children: [
        {
          id: 10,
          name: "Olivia Taylor",
          position: "Operations Manager",
          department: "Operations",
          contact: "012-345-6789",
          email: "olivia.taylor@example.com",
          image: "https://i.pravatar.cc/150?img=10",
          children: [
            {
              id: 11,
              name: "Noah Harris",
              position: "Logistics Coordinator",
              department: "Operations",
              contact: "123-543-7690",
              email: "noah.harris@example.com",
              image: "https://i.pravatar.cc/150?img=11",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

export const email: EmailType[] = [
  {
    id: 1,
    title: "Leave Request",
    createdAt: new Date("2025-03-01T08:45:00"),
    createdBy: "Michael King",
    status: "approved",
    approvedBy: "Super Admin",
    content: "Due to sickness",
    comment: "",
    requestFor: "Leave",
    read: true,
  },
  {
    id: 2,
    title: "Asset Request",
    createdAt: new Date("2025-02-28T10:30:00"),
    createdBy: "Michael King",
    status: null,
    approvedBy: null,
    content: "Need a laptop for project work",
    comment: "",
    requestFor: "Lenovo-Laptop",
    read: false,
  },
  {
    id: 3,
    title: "Budget Approval",
    createdAt: new Date("2025-03-05T14:20:00"),
    createdBy: "Sarah Johnson",
    status: "rejected",
    approvedBy: "Finance Admin",
    content: "Requesting approval for a team lunch budget.",
    comment: "Exceeds budget limits.",
    requestFor: "Budget",
    read: true,
  },
  {
    id: 4,
    title: "Leave Request",
    createdAt: new Date("2025-02-15T09:15:00"),
    createdBy: "John Doe",
    status: "approved",
    approvedBy: "HR Admin",
    content: "Requesting leave for personal reasons.",
    comment: "Approved for 3 days.",
    requestFor: "Leave",
    read: true,
  },
  {
    id: 5,
    title: "Project Approval",
    createdAt: new Date("2025-03-03T11:50:00"),
    createdBy: "Alice Brown",
    status: null,
    approvedBy: null,
    content: "Proposal for the Q2 Marketing Campaign.",
    comment: "",
    requestFor: "Project",
    read: false,
  },
  {
    id: 6,
    title: "Access Request",
    createdAt: new Date("2025-03-04T16:40:00"),
    createdBy: "David Lee",
    status: "approved",
    approvedBy: "IT Admin",
    content: "Requesting access to the analytics dashboard.",
    comment: "",
    requestFor: "Access",
    read: true,
  },
  {
    id: 7,
    title: "Conference Room Booking",
    createdAt: new Date("2025-02-20T14:05:00"),
    createdBy: "Jane Cooper",
    status: null,
    approvedBy: null,
    content: "Booking a conference room for the quarterly meeting.",
    comment: "",
    requestFor: "Booking",
    read: false,
  },
  {
    id: 8,
    title: "Policy Update Request",
    createdAt: new Date("2025-02-25T12:30:00"),
    createdBy: "Chris Evans",
    status: "rejected",
    approvedBy: "HR Admin",
    content: "Request to update work-from-home policy.",
    comment: "Needs further discussion.",
    requestFor: "Policy Update",
    read: true,
  },
  {
    id: 9,
    title: "Training Request",
    createdAt: new Date("2025-02-10T10:00:00"),
    createdBy: "Emma Watson",
    status: "approved",
    approvedBy: "Training Coordinator",
    content: "Request to enroll in React Advanced Training.",
    comment: "Training scheduled for March 15th.",
    requestFor: "Training",
    read: true,
  },
  {
    id: 10,
    title: "Laptop Repair",
    createdAt: new Date("2025-03-02T13:45:00"),
    createdBy: "James Bond",
    status: null,
    approvedBy: null,
    content: "Laptop malfunctioning, requesting repairs.",
    comment: "",
    requestFor: "Repair",
    read: false,
  },
  {
    id: 11,
    title: "Team Lunch Request",
    createdAt: new Date("2025-02-28T15:30:00"),
    createdBy: "Anna Taylor",
    status: "approved",
    approvedBy: "Manager",
    content: "Requesting approval for a team lunch expense.",
    comment: "Approved within budget.",
    requestFor: "Lunch",
    read: true,
  },
  {
    id: 12,
    title: "Workstation Setup",
    createdAt: new Date("2025-03-01T09:25:00"),
    createdBy: "Sam Wilson",
    status: null,
    approvedBy: null,
    content: "Requesting a new workstation for a new joiner.",
    comment: "",
    requestFor: "Setup",
    read: false,
  },
];

function flattenOrgTree(orgTree: any): { name: string; image: string }[] {
  let result: { name: string; image: string }[] = [];

  function traverse(node: any) {
    result.push({ name: node.name, image: node.image });
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  traverse(orgTree);
  return result;
}

export const employeeList = flattenOrgTree(orgTree);

export const data = [
  { name: "Software Development", value: 450000 },
  { name: "Business Development", value: 320000 },
  { name: "Human Resources", value: 180000 },
  { name: "Accounts Department", value: 250000 },
];

export const locationData = [{ name: "Hyderabad", value: 2000000 }];

export const compensationData = [
  {
    month: "January",
    planned_compensation: 5200,
    actual_compensation: 4800,
    variance: -200,
  },
  {
    month: "February",
    planned_compensation: 5000,
    actual_compensation: 4000,
    variance: 100,
  },
  {
    month: "March",
    planned_compensation: 5500,
    actual_compensation: 5400,
    variance: -100,
  },
  {
    month: "April",
    planned_compensation: 5800,
    actual_compensation: 5900,
    variance: 100,
  },
  {
    month: "May",
    planned_compensation: 6000,
    actual_compensation: 6100,
    variance: 100,
  },
  {
    month: "June",
    planned_compensation: 6200,
    actual_compensation: 6100,
    variance: -100,
  },
  {
    month: "July",
    planned_compensation: 6500,
    actual_compensation: 6400,
    variance: -100,
  },
  {
    month: "August",
    planned_compensation: 6700,
    actual_compensation: 6800,
    variance: 100,
  },
  {
    month: "September",
    planned_compensation: 7000,
    actual_compensation: 6900,
    variance: -100,
  },
  {
    month: "October",
    planned_compensation: 7200,
    actual_compensation: 7300,
    variance: 100,
  },
  {
    month: "November",
    planned_compensation: 7500,
    actual_compensation: 7600,
    variance: 100,
  },
  {
    month: "December",
    planned_compensation: 8000,
    actual_compensation: 7900,
    variance: -100,
  },
];

export const softwareDevelopmentCompensationData = [
  {
    month: "January",
    planned_compensation: 6200,
    actual_compensation: 6000,
    variance: -200,
  },
  {
    month: "February",
    planned_compensation: 6100,
    actual_compensation: 5800,
    variance: -300,
  },
  {
    month: "March",
    planned_compensation: 6300,
    actual_compensation: 6200,
    variance: -100,
  },
  {
    month: "April",
    planned_compensation: 6500,
    actual_compensation: 6600,
    variance: 100,
  },
  {
    month: "May",
    planned_compensation: 6700,
    actual_compensation: 6800,
    variance: 100,
  },
  {
    month: "June",
    planned_compensation: 6900,
    actual_compensation: 6800,
    variance: -100,
  },
  {
    month: "July",
    planned_compensation: 7100,
    actual_compensation: 7000,
    variance: -100,
  },
  {
    month: "August",
    planned_compensation: 7300,
    actual_compensation: 7400,
    variance: 100,
  },
  {
    month: "September",
    planned_compensation: 7500,
    actual_compensation: 7400,
    variance: -100,
  },
  {
    month: "October",
    planned_compensation: 7700,
    actual_compensation: 7800,
    variance: 100,
  },
  {
    month: "November",
    planned_compensation: 7900,
    actual_compensation: 8000,
    variance: 100,
  },
  {
    month: "December",
    planned_compensation: 8100,
    actual_compensation: 8000,
    variance: -100,
  },
];

export const businessDevelopmentCompensationData = [
  {
    month: "January",
    planned_compensation: 5400,
    actual_compensation: 5200,
    variance: -200,
  },
  {
    month: "February",
    planned_compensation: 5300,
    actual_compensation: 5000,
    variance: -300,
  },
  {
    month: "March",
    planned_compensation: 5500,
    actual_compensation: 5400,
    variance: -100,
  },
  {
    month: "April",
    planned_compensation: 5700,
    actual_compensation: 5800,
    variance: 100,
  },
  {
    month: "May",
    planned_compensation: 5900,
    actual_compensation: 6000,
    variance: 100,
  },
  {
    month: "June",
    planned_compensation: 6100,
    actual_compensation: 6000,
    variance: -100,
  },
  {
    month: "July",
    planned_compensation: 6300,
    actual_compensation: 6200,
    variance: -100,
  },
  {
    month: "August",
    planned_compensation: 6500,
    actual_compensation: 6600,
    variance: 100,
  },
  {
    month: "September",
    planned_compensation: 6700,
    actual_compensation: 6600,
    variance: -100,
  },
  {
    month: "October",
    planned_compensation: 6900,
    actual_compensation: 7000,
    variance: 100,
  },
  {
    month: "November",
    planned_compensation: 7100,
    actual_compensation: 7200,
    variance: 100,
  },
  {
    month: "December",
    planned_compensation: 7300,
    actual_compensation: 7200,
    variance: -100,
  },
];

export const humanResourcesCompensationData = [
  {
    month: "January",
    planned_compensation: 5000,
    actual_compensation: 4800,
    variance: -200,
  },
  {
    month: "February",
    planned_compensation: 4900,
    actual_compensation: 4700,
    variance: -200,
  },
  {
    month: "March",
    planned_compensation: 5100,
    actual_compensation: 5000,
    variance: -100,
  },
  {
    month: "April",
    planned_compensation: 5300,
    actual_compensation: 5400,
    variance: 100,
  },
  {
    month: "May",
    planned_compensation: 5500,
    actual_compensation: 5600,
    variance: 100,
  },
  {
    month: "June",
    planned_compensation: 5700,
    actual_compensation: 5600,
    variance: -100,
  },
  {
    month: "July",
    planned_compensation: 5900,
    actual_compensation: 5800,
    variance: -100,
  },
  {
    month: "August",
    planned_compensation: 6100,
    actual_compensation: 6200,
    variance: 100,
  },
  {
    month: "September",
    planned_compensation: 6300,
    actual_compensation: 6200,
    variance: -100,
  },
  {
    month: "October",
    planned_compensation: 6500,
    actual_compensation: 6600,
    variance: 100,
  },
  {
    month: "November",
    planned_compensation: 6700,
    actual_compensation: 6800,
    variance: 100,
  },
  {
    month: "December",
    planned_compensation: 6900,
    actual_compensation: 6800,
    variance: -100,
  },
];

export const accountsDepartmentCompensationData = [
  {
    month: "January",
    planned_compensation: 4800,
    actual_compensation: 4600,
    variance: -200,
  },
  {
    month: "February",
    planned_compensation: 4700,
    actual_compensation: 4500,
    variance: -200,
  },
  {
    month: "March",
    planned_compensation: 4900,
    actual_compensation: 4800,
    variance: -100,
  },
  {
    month: "April",
    planned_compensation: 5100,
    actual_compensation: 5200,
    variance: 100,
  },
  {
    month: "May",
    planned_compensation: 5300,
    actual_compensation: 5400,
    variance: 100,
  },
  {
    month: "June",
    planned_compensation: 5500,
    actual_compensation: 5400,
    variance: -100,
  },
  {
    month: "July",
    planned_compensation: 5700,
    actual_compensation: 5600,
    variance: -100,
  },
  {
    month: "August",
    planned_compensation: 5900,
    actual_compensation: 6000,
    variance: 100,
  },
  {
    month: "September",
    planned_compensation: 6100,
    actual_compensation: 6000,
    variance: -100,
  },
  {
    month: "October",
    planned_compensation: 6300,
    actual_compensation: 6400,
    variance: 100,
  },
  {
    month: "November",
    planned_compensation: 6500,
    actual_compensation: 6600,
    variance: 100,
  },
  {
    month: "December",
    planned_compensation: 6700,
    actual_compensation: 6600,
    variance: -100,
  },
];

export const salaryData = [
  {
    year: "2020-21",
    salaryRanges: [
      { range: "0-5 LPA", employees: 120 },
      { range: "5-10 LPA", employees: 80 },
      { range: "10-15 LPA", employees: 50 },
      { range: "15-20 LPA", employees: 30 },
      { range: "20+ LPA", employees: 20 },
    ],
  },
  {
    year: "2021-22",
    salaryRanges: [
      { range: "0-5 LPA", employees: 110 },
      { range: "5-10 LPA", employees: 95 },
      { range: "10-15 LPA", employees: 60 },
      { range: "15-20 LPA", employees: 35 },
      { range: "20+ LPA", employees: 25 },
    ],
  },
  {
    year: "2022-23",
    salaryRanges: [
      { range: "0-5 LPA", employees: 100 },
      { range: "5-10 LPA", employees: 105 },
      { range: "10-15 LPA", employees: 70 },
      { range: "15-20 LPA", employees: 40 },
      { range: "20+ LPA", employees: 30 },
    ],
  },
  {
    year: "2023-24",
    salaryRanges: [
      { range: "0-5 LPA", employees: 90 },
      { range: "5-10 LPA", employees: 120 },
      { range: "10-15 LPA", employees: 80 },
      { range: "15-20 LPA", employees: 50 },
      { range: "20+ LPA", employees: 40 },
    ],
  },
];

export const payDistribution = [
  {
    location: "Hyderabad",
    department: "Software Development",
    jobTitle: "Software Engineer",
    fixedPay: 700000,
    bonus: 80000,
    contribution: 50000,
    others: 20000,
    totalPay: 850000,
  },
  {
    location: "Hyderabad",
    department: "Software Development",
    jobTitle: "Senior Software Engineer",
    fixedPay: 900000,
    bonus: 100000,
    contribution: 70000,
    others: 30000,
    totalPay: 1100000,
  },
  {
    location: "Bengaluru",
    department: "Business Development",
    jobTitle: "Business Analyst",
    fixedPay: 600000,
    bonus: 70000,
    contribution: 40000,
    others: 15000,
    totalPay: 725000,
  },
  {
    location: "Mumbai",
    department: "Human Resources",
    jobTitle: "HR Manager",
    fixedPay: 650000,
    bonus: 80000,
    contribution: 50000,
    others: 25000,
    totalPay: 805000,
  },
  {
    location: "Mumbai",
    department: "Accounts Department",
    jobTitle: "Accountant",
    fixedPay: 500000,
    bonus: 50000,
    contribution: 30000,
    others: 10000,
    totalPay: 590000,
  },
  {
    location: "Delhi",
    department: "Software Development",
    jobTitle: "Software Engineer",
    fixedPay: 680000,
    bonus: 75000,
    contribution: 45000,
    others: 20000,
    totalPay: 820000,
  },
  {
    location: "Delhi",
    department: "Business Development",
    jobTitle: "Business Manager",
    fixedPay: 850000,
    bonus: 95000,
    contribution: 60000,
    others: 25000,
    totalPay: 1030000,
  },
  {
    location: "Chennai",
    department: "Human Resources",
    jobTitle: "Recruiter",
    fixedPay: 480000,
    bonus: 40000,
    contribution: 25000,
    others: 10000,
    totalPay: 555000,
  },
  {
    location: "Chennai",
    department: "Accounts Department",
    jobTitle: "Finance Manager",
    fixedPay: 750000,
    bonus: 90000,
    contribution: 50000,
    others: 20000,
    totalPay: 910000,
  },
  {
    location: "Bengaluru",
    department: "Software Development",
    jobTitle: "Software Engineer",
    fixedPay: 720000,
    bonus: 85000,
    contribution: 45000,
    others: 25000,
    totalPay: 875000,
  },
  {
    location: "Hyderabad",
    department: "Business Development",
    jobTitle: "Sales Representative",
    fixedPay: 550000,
    bonus: 60000,
    contribution: 35000,
    others: 15000,
    totalPay: 660000,
  },
];

export const roleToJobTitles = {
  admin: ["CEO", "CTO", "CFO"],
  dev: ["Software Developer", "System Analyst", "Data Scientist"],
  manager: ["Operations Manager", "Logistics Coordinator", "Quality Assurance"],
  finance: ["Accountant", "Financial Analyst", "Auditor"],
  engineering: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"],
  hr: ["HR Manager", "Recruiter", "Training Coordinator"],
};

// Routes with roles
export const initialRoutes = [
  {
    path: "/",
    element: "HomePage",
    roles: ["admin", "dev", "manager", "finance", "hr", "engineering"],
  },
  {
    path: "/tasks",
    element: "TasksPage",
    roles: ["admin", "dev", "manager", "finance", "hr", "engineering"],
  },
  {
    path: "/calendar",
    element: "CalendarPage",
    roles: ["admin", "dev", "manager", "finance", "hr", "engineering"],
  },
  {
    path: "/inbox",
    element: "InboxPage",
    roles: ["admin", "dev", "manager", "finance", "hr", "engineering"],
  },
  {
    path: "/projects",
    element: "ProjectsPage",
    roles: ["admin", "dev", "manager", "finance", "hr", "engineering"],
  },
  {
    path: "/employees",
    element: "EmployeesPage",
    roles: ["admin", "manager", "hr"],
  },
  {
    path: "/attendance",
    element: "AttendancePage",
    roles: ["admin", "manager", "hr"],
  },
  {
    path: "/payroll",
    element: "PayrollPage",
    roles: ["admin", "finance", "hr"],
  },
  { path: "/hiring", element: "HiringPage", roles: ["admin", "finance", "hr"] },
  { path: "/manage-access", element: "AccessPage", roles: ["admin"] },
  { path: "/settings", element: "AccessPage", roles: ["admin"] },
  { path: "/help", element: "AccessPage", roles: ["admin"] },
];

export const eventData = [
  {
    id: 1,
    date: "2025-03-05",
    title: "Candidate Interview",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    description:
      "Interview with a prospective candidate for the open position.",
  },
  {
    id: 2,
    date: "2025-03-05",
    title: "Follow Up with Client",
    startTime: "2:00 PM",
    endTime: "2:30 PM",
    description:
      "Check in with the client regarding project updates and concerns.",
  },
  {
    id: 3,
    date: "2025-03-12",
    title: "Team Meeting",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    description:
      "Weekly team meeting to discuss progress, roadblocks, and next steps.",
  },
  {
    id: 4,
    date: "2025-03-15",
    title: "Performance Review",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    description: "Annual employee performance review and feedback session.",
  },
  {
    id: 5,
    date: "2025-03-18",
    title: "Product Launch Preparation",
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    description:
      "Finalizing tasks and strategies for the upcoming product launch.",
  },
  {
    id: 6,
    date: "2025-03-20",
    title: "Marketing Strategy Discussion",
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    description:
      "Planning marketing initiatives and campaigns for the next quarter.",
  },
  {
    id: 7,
    date: "2025-03-22",
    title: "Client Presentation",
    startTime: "3:30 PM",
    endTime: "4:30 PM",
    description: "Presenting project updates and deliverables to the client.",
  },
  {
    id: 8,
    date: "2025-03-25",
    title: "Budget Planning for Next Quarter",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    description:
      "Reviewing financial performance and planning the budget for the next quarter.",
  },
  {
    id: 9,
    date: "2025-03-28",
    title: "Project Deadline",
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    description:
      "Final submission and review of deliverables for an ongoing project.",
  },
  {
    id: 10,
    date: "2025-04-02",
    title: "New Employee Orientation",
    startTime: "9:00 AM",
    endTime: "12:00 PM",
    description:
      "Welcoming and onboarding new employees with an introduction to company policies and teams.",
  },
  {
    id: 11,
    date: "2025-04-05",
    title: "Annual General Meeting",
    startTime: "10:00 AM",
    endTime: "1:00 PM",
    description:
      "Company-wide meeting to discuss annual performance, goals, and future strategies.",
  },
  {
    id: 12,
    date: "2025-04-08",
    title: "Code Review Session",
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    description:
      "Team code review session to improve quality and maintainability of the codebase.",
  },
  {
    id: 13,
    date: "2025-04-10",
    title: "HR Policy Update Meeting",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    description: "Discussion about updates and changes in company HR policies.",
  },
  {
    id: 14,
    date: "2025-04-03",
    title: "Stakeholder Review Call",
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    description:
      "Review session with stakeholders to discuss project progress and expectations.",
  },
  {
    id: 15,
    date: "2025-04-18",
    title: "Industry Conference Attendance",
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    description:
      "Attending an industry conference to network and gain insights into market trends.",
  },
  {
    id: 16,
    date: "2025-04-22",
    title: "Product Demo for Investors",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    description:
      "Demonstration of the product's features and benefits to potential investors.",
  },
  {
    id: 17,
    date: "2025-04-28",
    title: "Team Building Activity",
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    description:
      "Engaging team-building activities to improve collaboration and morale.",
  },
  {
    id: 18,
    date: "2025-05-01",
    title: "Quarterly Sales Report Submission",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    description:
      "Submission and discussion of the company's quarterly sales performance report.",
  },
  {
    id: 19,
    date: "2025-05-05",
    title: "Website Redesign Planning",
    startTime: "3:00 PM",
    endTime: "4:30 PM",
    description:
      "Brainstorming session for redesigning the company’s website with new features.",
  },
  {
    id: 20,
    date: "2025-05-10",
    title: "Cybersecurity Audit",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    description:
      "Assessing the company's cybersecurity measures and compliance with security protocols.",
  },
];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const dummyTasks = [
  {
    id: 1,
    title: "Design Homepage UI",
    description: "Create a modern and responsive homepage design using Figma.",
    dueDate: "2025-04-02", // Today
    priority: "high",
    status: "in progress",
    assignees: [
      {
        name: "Alice Johnson",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
      },
    ],
    tags: ["UI/UX", "design", "figma"],
  },
  {
    id: 2,
    title: "Fix Login Bug",
    description:
      "Resolve the issue where users are unable to log in with social accounts.",
    dueDate: "2025-04-01", // Yesterday
    priority: "critical",
    status: "pending",
    assignees: [
      {
        name: "Bob Smith",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
      },
    ],
    tags: ["bug", "authentication", "backend"],
  },
  {
    id: 3,
    title: "Update API Documentation",
    description:
      "Revise the API documentation to reflect recent changes in endpoints.",
    dueDate: null,
    priority: "medium",
    status: "completed",
    assignees: [
      {
        name: "Charlie Davis",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
      },
    ],
    tags: ["documentation", "API", "updates"],
  },
  {
    id: 4,
    title: "Optimize Database Queries",
    description:
      "Improve query performance by adding indexes and refactoring joins.",
    dueDate: "2025-04-03", // Tomorrow
    priority: "high",
    status: "in progress",
    assignees: [
      {
        name: "Diana White",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
      },
    ],
    tags: ["database", "performance", "optimization"],
  },
  {
    id: 5,
    title: "Deploy New Feature",
    description: "Deploy the new analytics dashboard to production.",
    dueDate: "2025-04-02", // Today
    priority: "high",
    status: "pending",
    assignees: [
      {
        name: "Ethan Brown",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    ],
    tags: ["deployment", "analytics", "dashboard"],
  },
];

export const applicants = [
  {
    id: 1,
    profilePhoto: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "John Doe",
    jobAppliedFor: "Frontend Developer",
    appliedDate: "2025-04-01",
    socials: {
      linkedIn: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    email: "johndoe@email.com",
    contact: "+1 234 567 8901",
    location: "San Francisco, CA, USA",
    education: "BSc in Computer Science, Stanford University",
    interviewStep: 2,
    resumeUrl: "https://example.com/resumes/john_doe_resume.pdf",
  },
  {
    id: 2,
    profilePhoto: "https://randomuser.me/api/portraits/women/32.jpg",
    name: "Jane Smith",
    jobAppliedFor: "Data Scientist",
    appliedDate: "2025-03-30",
    socials: {
      linkedIn: "https://www.linkedin.com/in/janesmith",
      kaggle: "https://www.kaggle.com/janesmith",
    },
    email: "janesmith@email.com",
    contact: "+44 789 123 4567",
    location: "London, UK",
    education: "MSc in Data Science, University of Oxford",
    interviewStep: 1,
    resumeUrl: "https://example.com/resumes/jane_smith_resume.pdf",
  },
  {
    id: 3,
    profilePhoto: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Alex Johnson",
    jobAppliedFor: "Backend Developer",
    appliedDate: "2025-04-02",
    socials: {
      linkedIn: "https://www.linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
    },
    email: "alexjohnson@email.com",
    contact: "+61 423 789 654",
    location: "Sydney, Australia",
    education: "BEng in Software Engineering, University of Melbourne",
    interviewStep: 4,
    resumeUrl: "https://example.com/resumes/alex_johnson_resume.pdf",
  },
  {
    id: 4,
    profilePhoto: "https://randomuser.me/api/portraits/women/14.jpg",
    name: "Emily White",
    jobAppliedFor: "UX/UI Designer",
    appliedDate: "2025-03-28",
    socials: {
      linkedIn: "https://www.linkedin.com/in/emilywhite",
      dribbble: "https://dribbble.com/emilywhite",
    },
    email: "emilywhite@email.com",
    contact: "+49 176 987 3210",
    location: "Berlin, Germany",
    education: "BA in Graphic Design, University of Arts Berlin",
    interviewStep: 3,
    resumeUrl: "https://example.com/resumes/emily_white_resume.pdf",
  },
  {
    id: 5,
    profilePhoto: "https://randomuser.me/api/portraits/men/23.jpg",
    name: "Daniel Kim",
    jobAppliedFor: "AI/ML Engineer",
    appliedDate: "2025-04-01",
    socials: {
      linkedIn: "https://www.linkedin.com/in/danielkim",
      github: "https://github.com/danielkim",
    },
    email: "danielkim@email.com",
    contact: "+82 10 5678 1234",
    location: "Seoul, South Korea",
    education: "PhD in Machine Learning, KAIST",
    interviewStep: 1,
    resumeUrl: "https://example.com/resumes/daniel_kim_resume.pdf",
  },
  {
    id: 6,
    profilePhoto: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Sophia Brown",
    jobAppliedFor: "Product Manager",
    appliedDate: "2025-03-29",
    socials: {
      linkedIn: "https://www.linkedin.com/in/sophiabrown",
    },
    email: "sophiabrown@email.com",
    contact: "+33 612 345 678",
    location: "Paris, France",
    education: "MBA in Business Strategy, HEC Paris",
    interviewStep: 3,
    resumeUrl: "https://example.com/resumes/sophia_brown_resume.pdf",
  },
  {
    id: 7,
    profilePhoto: "https://randomuser.me/api/portraits/men/36.jpg",
    name: "Michael Lee",
    jobAppliedFor: "DevOps Engineer",
    appliedDate: "2025-03-31",
    socials: {
      linkedIn: "https://www.linkedin.com/in/michaellee",
      github: "https://github.com/michaellee",
    },
    email: "michaellee@email.com",
    contact: "+1 987 654 3210",
    location: "New York, USA",
    education: "MSc in Cloud Computing, MIT",
    interviewStep: 4,
    resumeUrl: "https://example.com/resumes/michael_lee_resume.pdf",
  },
  {
    id: 8,
    profilePhoto: "https://randomuser.me/api/portraits/women/26.jpg",
    name: "Olivia Martinez",
    jobAppliedFor: "Marketing Specialist",
    appliedDate: "2025-03-27",
    socials: {
      linkedIn: "https://www.linkedin.com/in/oliviamartinez",
      twitter: "https://twitter.com/oliviamartinez",
    },
    email: "oliviamartinez@email.com",
    contact: "+34 678 901 234",
    location: "Madrid, Spain",
    education: "BA in Digital Marketing, IE University",
    interviewStep: 1,
    resumeUrl: "https://example.com/resumes/olivia_martinez_resume.pdf",
  },
  {
    id: 9,
    profilePhoto: "https://randomuser.me/api/portraits/men/19.jpg",
    name: "Ryan Williams",
    jobAppliedFor: "Cybersecurity Analyst",
    appliedDate: "2025-04-02",
    socials: {
      linkedIn: "https://www.linkedin.com/in/ryanwilliams",
      github: "https://github.com/ryanwilliams",
    },
    email: "ryanwilliams@email.com",
    contact: "+44 731 456 7890",
    location: "Manchester, UK",
    education: "MSc in Cybersecurity, University of Manchester",
    interviewStep: 2,
    resumeUrl: "https://example.com/resumes/ryan_williams_resume.pdf",
  },
  {
    id: 10,
    profilePhoto: "https://randomuser.me/api/portraits/women/48.jpg",
    name: "Isabella Garcia",
    jobAppliedFor: "Software Engineer",
    appliedDate: "2025-04-03",
    socials: {
      linkedIn: "https://www.linkedin.com/in/isabellagarcia",
      github: "https://github.com/isabellagarcia",
    },
    email: "isabellagarcia@email.com",
    contact: "+55 21 98765 4321",
    location: "Rio de Janeiro, Brazil",
    education: "BSc in Software Engineering, PUC-Rio",
    interviewStep: 4,
    resumeUrl: "https://example.com/resumes/isabella_garcia_resume.pdf",
  },
];

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "We are looking for a skilled Frontend Developer with experience in React and Next.js to build and maintain user interfaces.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    qualifications: [
      "Bachelor’s degree in Computer Science or related field",
      "2+ years of frontend development experience",
    ],
    status: "Active",
    deadline: "2025-04-15",
    postedOn: "2025-03-20",
    applicants: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 2,
    title: "Data Scientist",
    description:
      "Seeking a Data Scientist to analyze large datasets, develop predictive models, and improve business decision-making.",
    skills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "Pandas",
      "SQL",
      "Data Visualization",
    ],
    qualifications: [
      "Master’s or Bachelor’s in Data Science, Computer Science, or related field",
      "Experience with large datasets and predictive modeling",
    ],
    status: "Active",
    deadline: "2025-04-20",
    postedOn: "2025-03-22",
    applicants: [2],
  },
  {
    id: 3,
    title: "Backend Developer",
    description:
      "Looking for a Backend Developer to build and optimize server-side logic using Node.js and databases like PostgreSQL.",
    skills: ["Node.js", "Express.js", "PostgreSQL", "GraphQL", "Docker"],
    qualifications: [
      "Bachelor’s degree in Computer Science or equivalent",
      "Experience with backend development and API design",
    ],
    status: "Expired",
    deadline: "2025-03-25",
    postedOn: "2025-02-25",
    applicants: [3, 7],
  },
  {
    id: 4,
    title: "UX/UI Designer",
    description:
      "Hiring a UX/UI Designer to create intuitive and visually appealing designs for web and mobile applications.",
    skills: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Wireframing",
      "Prototyping",
    ],
    qualifications: [
      "Degree in Design, UX, or related field",
      "Experience in designing user-friendly interfaces",
    ],
    status: "Active",
    deadline: "2025-04-10",
    postedOn: "2025-03-15",
    applicants: [4],
  },
  {
    id: 5,
    title: "AI/ML Engineer",
    description:
      "Looking for an AI/ML Engineer to work on machine learning models, data pipelines, and AI-driven applications.",
    skills: [
      "Python",
      "Deep Learning",
      "PyTorch",
      "TensorFlow",
      "NLP",
      "Data Engineering",
    ],
    qualifications: [
      "Master’s or Bachelor's in AI, Data Science, or related field",
      "Experience in deploying ML models",
    ],
    status: "Active",
    deadline: "2025-04-30",
    postedOn: "2025-03-18",
    applicants: [5],
  },
  {
    id: 6,
    title: "Product Manager",
    description:
      "Seeking a Product Manager to drive product strategy, manage teams, and oversee product development.",
    skills: [
      "Agile Methodology",
      "Product Roadmap",
      "Stakeholder Management",
      "JIRA",
    ],
    qualifications: [
      "MBA or equivalent experience",
      "Proven experience in product management",
    ],
    status: "Expired",
    deadline: "2025-03-28",
    postedOn: "2025-02-28",
    applicants: [6],
  },
  {
    id: 7,
    title: "DevOps Engineer",
    description:
      "Hiring a DevOps Engineer to automate infrastructure, improve CI/CD pipelines, and optimize cloud environments.",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform"],
    qualifications: [
      "Degree in Computer Science or equivalent",
      "Experience in DevOps and cloud automation",
    ],
    status: "Active",
    deadline: "2025-04-12",
    postedOn: "2025-03-19",
    applicants: [7],
  },
  {
    id: 8,
    title: "Marketing Specialist",
    description:
      "Seeking a Marketing Specialist to develop and execute marketing campaigns, manage social media, and increase brand awareness.",
    skills: ["SEO", "Google Ads", "Content Marketing", "Social Media Strategy"],
    qualifications: [
      "Degree in Marketing, Business, or related field",
      "Experience with digital marketing campaigns",
    ],
    status: "Active",
    deadline: "2025-04-18",
    postedOn: "2025-03-21",
    applicants: [7],
  },
  {
    id: 9,
    title: "Cybersecurity Analyst",
    description:
      "Hiring a Cybersecurity Analyst to monitor security threats, conduct risk assessments, and implement security measures.",
    skills: [
      "Network Security",
      "Penetration Testing",
      "SIEM",
      "Ethical Hacking",
    ],
    qualifications: [
      "Degree in Cybersecurity or related field",
      "Certifications like CEH, CISSP preferred",
    ],
    status: "Expired",
    deadline: "2025-03-22",
    postedOn: "2025-02-22",
    applicants: [8],
  },
  {
    id: 10,
    title: "Software Engineer",
    description:
      "Looking for a Software Engineer to develop and maintain scalable applications with modern programming frameworks.",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "REST APIs"],
    qualifications: [
      "Bachelor’s degree in Computer Science",
      "Experience in full-stack development",
    ],
    status: "Active",
    deadline: "2025-04-25",
    postedOn: "2025-03-23",
    applicants: [9],
  },
];

export const interviews = [
  {
    title: "Frontend Developer Interview",
    description: "Technical interview covering React, Next.js, and Redux.",
    date: "2025-04-03",
    start_time: "10:00 AM",
    end_time: "11:00 AM",
    participant: {
      id: 1,
      name: "John Doe",
      profilePhoto: "https://randomuser.me/api/portraits/men/45.jpg",
      email: "johndoe@email.com",
      jobAppliedFor: "Frontend Developer",
    },
  },
  {
    title: "Backend Developer Interview",
    description: "Discussion on Node.js, Express, and database optimization.",
    date: "2025-04-03",
    start_time: "11:30 AM",
    end_time: "12:30 PM",
    participant: {
      id: 3,
      name: "Alex Johnson",
      profilePhoto: "https://randomuser.me/api/portraits/men/52.jpg",
      email: "alexjohnson@email.com",
      jobAppliedFor: "Backend Developer",
    },
  },
  {
    title: "HR Round",
    description:
      "General discussion on company culture, expectations, and benefits.",
    date: "2025-03-15",
    start_time: "02:00 PM",
    end_time: "02:45 PM",
    participant: {
      id: 2,
      name: "Jane Smith",
      profilePhoto: "https://randomuser.me/api/portraits/women/32.jpg",
      email: "janesmith@email.com",
      jobAppliedFor: "Data Scientist",
    },
  },
  {
    title: "System Design Interview",
    description: "Evaluating system design skills for scalable applications.",
    date: "2025-03-15",
    start_time: "03:00 PM",
    end_time: "04:00 PM",
    participant: {
      id: 10,
      name: "Isabella Garcia",
      profilePhoto: "https://randomuser.me/api/portraits/women/48.jpg",
      email: "isabellagarcia@email.com",
      jobAppliedFor: "Software Engineer",
    },
  },
  {
    title: "Final Interview with CTO",
    description: "Final discussion and offer negotiation with the CTO.",
    date: "2025-03-15",
    start_time: "04:30 PM",
    end_time: "05:15 PM",
    participant: {
      id: 6,
      name: "Sophia Brown",
      profilePhoto: "https://randomuser.me/api/portraits/women/45.jpg",
      email: "sophiabrown@email.com",
      jobAppliedFor: "Product Manager",
    },
  },
];

export const projects: Project[] = [
  {
    id: 1,
    name: "AI Chatbot Integration",
    description:
      "Develop an AI-powered chatbot using OpenAI's GPT API for customer support automation.",
    start_date: "2025-01-10",
    end_date: "2025-06-30",
    status: "In Progress",
    progress: 65,
    priority: "High",
    team_id: 101,
    budget: 50000,
  },
  {
    id: 2,
    name: "E-Commerce Platform Revamp",
    description:
      "Redesign the company's e-commerce platform with a modern UI and improved performance.",
    start_date: "2024-11-15",
    end_date: "2025-05-20",
    status: "Completed",
    progress: 100,
    priority: "Medium",
    team_id: 102,
    budget: 75000,
  },
  {
    id: 3,
    name: "Cloud Migration Project",
    description:
      "Migrate the company's internal applications from on-premise servers to AWS Cloud.",
    start_date: "2025-03-01",
    end_date: "2025-12-31",
    status: "Planning",
    progress: 10,
    priority: "High",
    team_id: 103,
    budget: 120000,
  },
  {
    id: 4,
    name: "Mobile App Development",
    description:
      "Build a cross-platform mobile app for managing employee attendance and payroll.",
    start_date: "2025-02-10",
    end_date: "2025-09-15",
    status: "In Progress",
    progress: 40,
    priority: "High",
    team_id: 104,
    budget: 60000,
  },
  {
    id: 5,
    name: "Cybersecurity Enhancement",
    description:
      "Improve the company's cybersecurity by implementing zero-trust architecture.",
    start_date: "2025-04-01",
    end_date: "2025-12-31",
    status: "Not Started",
    progress: 0,
    priority: "Critical",
    team_id: 105,
    budget: 90000,
  },
];

export const teams: Team[] = [
  {
    team_id: 101,
    members: [
      { name: "John Doe", role: "Project Manager" },
      { name: "Alice Smith", role: "Backend Developer" },
      { name: "Bob Johnson", role: "Frontend Developer" },
    ],
  },
  {
    team_id: 102,
    members: [
      { name: "Emma Wilson", role: "UI/UX Designer" },
      { name: "Michael Brown", role: "Full Stack Developer" },
      { name: "Sophia Davis", role: "QA Engineer" },
    ],
  },
  {
    team_id: 103,
    members: [
      { name: "Olivia Martinez", role: "Cloud Architect" },
      { name: "Liam Anderson", role: "DevOps Engineer" },
      { name: "Noah Garcia", role: "Security Specialist" },
    ],
  },
  {
    team_id: 104,
    members: [
      { name: "William Thompson", role: "Mobile Developer" },
      { name: "Isabella White", role: "Backend Developer" },
      { name: "James Harris", role: "Product Manager" },
    ],
  },
  {
    team_id: 105,
    members: [
      { name: "Ethan Clark", role: "Cybersecurity Analyst" },
      { name: "Ava Lewis", role: "Network Engineer" },
      { name: "Mason Walker", role: "Compliance Officer" },
    ],
  },
];
