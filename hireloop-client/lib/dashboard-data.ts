export type ActivityKind = "status" | "match" | "message"

export type SeekerActivity = {
  id: string
  kind: ActivityKind
  text: string
  highlight?: string
  time: string
}

export type SavedJobRow = {
  id: string
  title: string
  company: string
  logo: string
  level: string
  location: string
  salary: string
  saved: string
  deadline?: string
  closed?: boolean
  draft?: boolean
}

export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Interview"
  | "Rejected"
  | "Offered"

export type ApplicationRow = {
  id: string
  jobId: string
  title: string
  company: string
  type: string
  applied: string
  status: ApplicationStatus
  archived?: boolean
}

export type PaymentRow = {
  id: string
  date: string
  plan: string
  amount: string
  transactionId: string
  status: "Paid" | "Pending" | "Failed"
  email?: string
}

export type ApplicantStatus =
  | "Interviewing"
  | "New"
  | "Reviewing"
  | "Rejected"
  | "Offered"

export type ApplicantRow = {
  id: string
  name: string
  email: string
  role: string
  applied: string
  experience: string
  status: ApplicantStatus
  color: string
}

export type RecruiterJobRow = {
  id: string
  title: string
  department: string
  company: string
  location: string
  logo: string
  type: string
  compensation: string
  applicants: number
  status: "Active" | "Expired" | "Closed"
  deadline: string
}

export type AdminUserRow = {
  id: string
  name: string
  email: string
  role: "Seeker" | "Recruiter"
  joined: string
  status: "Active" | "Suspended"
}

export type AdminJobRow = {
  id: string
  title: string
  company: string
  category: string
  type: string
  posted: string
  status: "Active" | "Closed"
}

export type AdminTransactionRow = {
  id: string
  email: string
  name: string
  plan: string
  amount: string
  date: string
  transactionId: string
  status: "Success" | "Pending" | "Failed"
}

export const seekerStats = [
  { label: "Saved Jobs", value: "12" },
  { label: "Applications Submitted", value: "24" },
  { label: "Interviews Scheduled", value: "3" },
  { label: "Offers Received", value: "1" },
] as const

export const seekerActivity: SeekerActivity[] = [
  {
    id: "activity-1",
    kind: "status",
    text: "Application for Senior Product Designer at TechFlow updated to",
    highlight: "Under Review",
    time: "2 hours ago",
  },
  {
    id: "activity-2",
    kind: "match",
    text: "New Job Alert: Lead Frontend Engineer at FinGrid matches your profile",
    time: "5 hours ago",
  },
  {
    id: "activity-3",
    kind: "message",
    text: "You have a new message from Sarah Jenkins (Hiring Manager at CloudOps)",
    time: "1 day ago",
  },
]

export const savedJobs: SavedJobRow[] = [
  {
    id: "techflow-systems-senior-product-designer",
    title: "Senior Product Designer",
    company: "TechFlow Systems",
    logo: "/images/companies/techflow.jpg",
    level: "Senior",
    location: "San Francisco, CA (Hybrid)",
    salary: "$140k – $180k",
    saved: "Saved 2 hours ago",
    deadline: "Closes in 3 days",
  },
  {
    id: "techflow-systems-frontend-engineer",
    title: "Frontend Engineer",
    company: "TechFlow Systems",
    logo: "/images/companies/techflow.jpg",
    level: "Mid",
    location: "Remote, Global",
    salary: "$140k – $160k",
    saved: "Saved yesterday",
  },
  {
    id: "creative-studio-ux-researcher",
    title: "UX Researcher",
    company: "CreativeStudio",
    logo: "/images/companies/creativestudio.jpg",
    level: "Mid",
    location: "New York, NY (On-site)",
    salary: "$100k – $122k",
    saved: "Saved 3 days ago",
    draft: true,
  },
  {
    id: "cloudscale-ai-senior-product-designer",
    title: "Senior Product Designer",
    company: "CloudScale AI",
    logo: "/images/companies/cloudscale-ai.jpg",
    level: "Senior",
    location: "Menlo Park, CA (On-site)",
    salary: "$150k – $210k + Bonus",
    saved: "Saved 5 days ago",
  },
  {
    id: "techflow-systems-design-systems-engineer",
    title: "Design Systems Engineer",
    company: "TechFlow Systems",
    logo: "/images/companies/techflow.jpg",
    level: "Mid",
    location: "Remote, USA",
    salary: "$130k – $170k",
    saved: "Saved 1 week ago",
    closed: true,
  },
  {
    id: "fingrid-solutions-lead-frontend-engineer",
    title: "Lead Frontend Engineer",
    company: "FinGrid Solutions",
    logo: "/images/companies/fingrid.jpg",
    level: "Lead",
    location: "New York, NY (Hybrid)",
    salary: "$180k – $240k",
    saved: "Saved 1 week ago",
  },
]

export const applicationStats = [
  { label: "Total Applied", value: "24" },
  { label: "Shortlisted", value: "8" },
  { label: "Interviews", value: "3" },
  { label: "Success Rate", value: "12%", accent: true },
] as const

export const applications: ApplicationRow[] = [
  {
    id: "application-1",
    jobId: "cloudscale-ai-senior-product-designer",
    title: "Senior Product Designer",
    company: "CloudScale AI",
    type: "Full-time · Remote",
    applied: "2 hours ago",
    status: "Applied",
  },
  {
    id: "application-2",
    jobId: "techflow-systems-frontend-engineer",
    title: "Frontend Engineer",
    company: "TechFlow Systems",
    type: "Full-time · Hybrid",
    applied: "1 day ago",
    status: "Review",
  },
  {
    id: "application-3",
    jobId: "creative-studio-ux-researcher",
    title: "UX Researcher",
    company: "CreativeStudio",
    type: "Full-time · On-site",
    applied: "4 days ago",
    status: "Shortlisted",
  },
  {
    id: "application-4",
    jobId: "healthai-corp-machine-learning-engineer",
    title: "Machine Learning Engineer",
    company: "HealthAI Corp",
    type: "Full-time · Remote",
    applied: "1 week ago",
    status: "Rejected",
  },
  {
    id: "application-5",
    jobId: "fingrid-solutions-product-manager-payments",
    title: "Product Manager, Payments",
    company: "FinGrid Solutions",
    type: "Full-time · Hybrid",
    applied: "2 weeks ago",
    status: "Offered",
  },
]

export const billingHistory: PaymentRow[] = [
  {
    id: "payment-1",
    date: "Jun 24, 2026",
    plan: "Professional Tier",
    amount: "$29.00",
    transactionId: "TXN-4821-332",
    status: "Paid",
  },
  {
    id: "payment-2",
    date: "May 24, 2026",
    plan: "Professional Tier",
    amount: "$29.00",
    transactionId: "TXN-7713-920",
    status: "Paid",
  },
  {
    id: "payment-3",
    date: "Apr 24, 2026",
    plan: "Professional Tier",
    amount: "$29.00",
    transactionId: "TXN-3318-551",
    status: "Paid",
  },
  {
    id: "payment-4",
    date: "Mar 24, 2026",
    plan: "Standard Tier",
    amount: "$12.00",
    transactionId: "TXN-2011-984",
    status: "Paid",
  },
]

export const seekerSkills = ["Figma", "UI Design", "Prototyping"]

export const recruiterStats = [
  { label: "Total Job Posts", value: "48", trend: "+12%", tone: "positive" },
  {
    label: "Total Applicants",
    value: "1,284",
    trend: "+18%",
    tone: "positive",
  },
  { label: "Active Jobs", value: "18", trend: "+4%", tone: "positive" },
  { label: "Jobs Closed", value: "32", trend: "", tone: "neutral" },
] as const

export const recentApplicants: ApplicantRow[] = [
  {
    id: "applicant-1",
    name: "Julianne Moore",
    email: "julianne.moore@example.com",
    role: "Senior Product Designer",
    applied: "Oct 24, 2026",
    experience: "6 years",
    status: "Interviewing",
    color: "#5c53fe",
  },
  {
    id: "applicant-2",
    name: "Robert Downey",
    email: "robert.downey@example.com",
    role: "Backend Engineer",
    applied: "Oct 23, 2026",
    experience: "4 years",
    status: "New",
    color: "#0ea5e9",
  },
  {
    id: "applicant-3",
    name: "Emma Stone",
    email: "emma.stone@example.com",
    role: "Marketing Lead",
    applied: "Oct 23, 2026",
    experience: "8 years",
    status: "Reviewing",
    color: "#f59e0b",
  },
  {
    id: "applicant-4",
    name: "Chris Pratt",
    email: "chris.pratt@example.com",
    role: "Product Manager",
    applied: "Oct 21, 2026",
    experience: "5 years",
    status: "Rejected",
    color: "#94a3b8",
  },
  {
    id: "applicant-5",
    name: "Ana de Armas",
    email: "ana.dearmas@example.com",
    role: "Frontend Engineer",
    applied: "Oct 20, 2026",
    experience: "3 years",
    status: "Offered",
    color: "#22c55e",
  },
]

export const recruiterJobs: RecruiterJobRow[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    company: "HireFlow Network",
    location: "Remote · New York, USA",
    logo: "/images/companies/techflow.jpg",
    type: "Full-time",
    compensation: "€25 – €40 / hr",
    applicants: 24,
    status: "Active",
    deadline: "May 30, 2026",
  },
  {
    id: "senior-product-designer",
    title: "Senior Product Designer",
    department: "Design",
    company: "HireFlow Network",
    location: "London, UK (Hybrid)",
    logo: "/images/companies/cloudscale-ai.jpg",
    type: "Full-time",
    compensation: "€30 – €45 / hr",
    applicants: 8,
    status: "Active",
    deadline: "Jun 14, 2026",
  },
  {
    id: "devops-specialist",
    title: "DevOps Specialist",
    department: "DevOps",
    company: "HireFlow Platform",
    location: "Berlin, Germany",
    logo: "/images/companies/fingrid.jpg",
    type: "Full-time",
    compensation: "€35 – €50 / hr",
    applicants: 12,
    status: "Active",
    deadline: "Jun 30, 2026",
  },
  {
    id: "product-marketing-lead",
    title: "Product Marketing Lead",
    department: "Marketing",
    company: "HireFlow Network",
    location: "Remote · USA",
    logo: "/images/companies/creativestudio.jpg",
    type: "Full-time",
    compensation: "€30 – €40 / hr",
    applicants: 27,
    status: "Active",
    deadline: "Jul 15, 2026",
  },
  {
    id: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "Engineering",
    company: "HireFlow Platform",
    location: "Remote · Global",
    logo: "/images/companies/healthai.jpg",
    type: "Part-time",
    compensation: "€20 – €30 / hr",
    applicants: 0,
    status: "Expired",
    deadline: "May 01, 2026",
  },
]

export const recruiterApplicationStats = [
  { label: "Total Applications", value: "1,284" },
  { label: "In Review", value: "186" },
  { label: "Interviewing", value: "42" },
  { label: "Hired", value: "28" },
] as const

export const adminStats = [
  {
    label: "Total Users",
    value: "124,892",
    trend: "+12%",
    tone: "positive",
    icon: "users",
  },
  {
    label: "Total Recruiters",
    value: "12,405",
    trend: "+8%",
    tone: "positive",
    icon: "recruiters",
  },
  {
    label: "Total Companies",
    value: "4,281",
    trend: "0%",
    tone: "neutral",
    icon: "companies",
  },
  {
    label: "Jobs Posted",
    value: "8,920",
    trend: "+24%",
    tone: "positive",
    icon: "jobs",
  },
  {
    label: "Platform Revenue",
    value: "$245,800",
    trend: "+18.5%",
    tone: "positive",
    icon: "revenue",
  },
] as const

export const adminTransactions: AdminTransactionRow[] = [
  {
    id: "txn-1",
    email: "markus.k@techcorp.io",
    name: "TechCorp Inc",
    plan: "Enterprise Monthly",
    amount: "$1,299.00",
    date: "May 16, 2026 · 14:20",
    transactionId: "TXN-982341",
    status: "Success",
  },
  {
    id: "txn-2",
    email: "sarah.k@creativestudio.com",
    name: "Creative Studio",
    plan: "Professional Annual",
    amount: "$499.00",
    date: "May 16, 2026 · 11:05",
    transactionId: "TXN-882183",
    status: "Success",
  },
  {
    id: "txn-3",
    email: "lisa@wavefinance.org",
    name: "Wave Finance",
    plan: "Starter Monthly",
    amount: "$49.00",
    date: "May 15, 2026 · 09:40",
    transactionId: "TXN-774129",
    status: "Pending",
  },
  {
    id: "txn-4",
    email: "rachel@lumienglobal.net",
    name: "Lumen Global",
    plan: "Enterprise Monthly",
    amount: "$1,299.00",
    date: "May 14, 2026 · 16:12",
    transactionId: "TXN-551914",
    status: "Failed",
  },
]

export const adminUsers: AdminUserRow[] = [
  {
    id: "user-1",
    name: "Jordan Davis",
    email: "jordan.davis@example.com",
    role: "Seeker",
    joined: "Oct 12, 2023",
    status: "Active",
  },
  {
    id: "user-2",
    name: "Elena Rodriguez",
    email: "elena.r@talentflow.io",
    role: "Recruiter",
    joined: "Sep 28, 2023",
    status: "Active",
  },
  {
    id: "user-3",
    name: "Marcus Webb",
    email: "m.webb@cloudpeak.co",
    role: "Seeker",
    joined: "Aug 05, 2023",
    status: "Suspended",
  },
  {
    id: "user-4",
    name: "Tom Hiddleston",
    email: "t.hiddleston@tekni.tech",
    role: "Recruiter",
    joined: "Nov 01, 2023",
    status: "Active",
  },
  {
    id: "user-5",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "Seeker",
    joined: "Jul 19, 2023",
    status: "Active",
  },
  {
    id: "user-6",
    name: "Daniel Kim",
    email: "daniel.kim@northstar.dev",
    role: "Recruiter",
    joined: "Jun 11, 2023",
    status: "Active",
  },
]

export const adminUserStats = [
  {
    label: "Total Active Users",
    value: "12,842",
    hint: "+12% vs last month",
    tone: "positive",
    icon: "users",
  },
  {
    label: "Recruiter Growth",
    value: "843",
    hint: "High demand",
    tone: "positive",
    icon: "recruiters",
  },
  {
    label: "Suspended Accounts",
    value: "124",
    hint: "0.8% of total",
    tone: "neutral",
    icon: "suspended",
  },
  {
    label: "New Signups (24h)",
    value: "42",
    hint: "Steady activity",
    tone: "warning",
    icon: "signups",
  },
] as const

export const adminJobs: AdminJobRow[] = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "Nexus Lab",
    category: "Design",
    type: "Full-time",
    posted: "Oct 24, 2023",
    status: "Active",
  },
  {
    id: "job-2",
    title: "Full-stack Engineer",
    company: "Quantum",
    category: "Engineering",
    type: "Contract",
    posted: "Oct 22, 2023",
    status: "Active",
  },
  {
    id: "job-3",
    title: "Marketing Director",
    company: "Vanguard",
    category: "Marketing",
    type: "Full-time",
    posted: "Oct 15, 2023",
    status: "Closed",
  },
  {
    id: "job-4",
    title: "Backend Architect",
    company: "CloudScale",
    category: "Engineering",
    type: "Remote",
    posted: "Oct 20, 2023",
    status: "Active",
  },
  {
    id: "job-5",
    title: "UX Research Lead",
    company: "Humanize",
    category: "Design",
    type: "Hybrid",
    posted: "Oct 18, 2023",
    status: "Active",
  },
]

export const adminPaymentStats = [
  {
    label: "Total Revenue",
    value: "$1,284,500",
    trend: "+12.4%",
    icon: "revenue",
  },
  {
    label: "Monthly Revenue",
    value: "$94,210",
    trend: "+8.3%",
    icon: "monthly",
  },
  {
    label: "Active Pro Users",
    value: "12,408",
    trend: "+2.3%",
    icon: "users",
  },
  {
    label: "Active Enterprise Users",
    value: "842",
    trend: "+15.7%",
    icon: "enterprise",
  },
] as const

export const adminPaymentRows: AdminTransactionRow[] = [
  {
    id: "pay-1",
    email: "jordan.davis@enterprise.co",
    name: "Enterprise Co",
    plan: "Enterprise",
    amount: "$4,500.00",
    date: "May 19, 2026",
    transactionId: "TXN-88219443",
    status: "Success",
  },
  {
    id: "pay-2",
    email: "sarah.k@techflow.io",
    name: "TechFlow",
    plan: "Pro",
    amount: "$299.00",
    date: "May 18, 2026",
    transactionId: "TXN-77343291",
    status: "Success",
  },
  {
    id: "pay-3",
    email: "marcus.lee@gmail.com",
    name: "Marcus Lee",
    plan: "Starter",
    amount: "$49.00",
    date: "May 16, 2026",
    transactionId: "TXN-11029457",
    status: "Pending",
  },
  {
    id: "pay-4",
    email: "e.lopez@globalloundries.com",
    name: "Global Laundries",
    plan: "Enterprise",
    amount: "$12,000.00",
    date: "May 10, 2026",
    transactionId: "TXN-08948712",
    status: "Failed",
  },
]

export const adminCompanies = [
  {
    id: "nexus-lab",
    name: "Nexus Lab",
    industry: "Design & Product",
    location: "San Francisco, CA",
    employees: "250 – 500",
    jobs: 18,
    status: "Active" as const,
  },
  {
    id: "quantum",
    name: "Quantum",
    industry: "Engineering",
    location: "Austin, TX",
    employees: "500 – 1,000",
    jobs: 12,
    status: "Active" as const,
  },
  {
    id: "vanguard",
    name: "Vanguard",
    industry: "Marketing",
    location: "New York, NY",
    employees: "1,000+",
    jobs: 9,
    status: "Pending" as const,
  },
  {
    id: "cloudscale",
    name: "CloudScale",
    industry: "Infrastructure",
    location: "Seattle, WA",
    employees: "250 – 500",
    jobs: 24,
    status: "Active" as const,
  },
  {
    id: "humanize",
    name: "Humanize",
    industry: "Research",
    location: "Remote",
    employees: "50 – 250",
    jobs: 6,
    status: "Suspended" as const,
  },
]
