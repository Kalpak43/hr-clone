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
    date: "2025-04-15",
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
    dueDate: "2025-04-10",
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
    dueDate: "2025-04-05",
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
    dueDate: "2025-04-15",
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
    dueDate: "2025-04-08",
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
