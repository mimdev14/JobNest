export const CATEGORIES = ["Engineering", "Design", "Marketing", "Sales", "Product", "Customer Support", "Finance", "HR", "Operations"];
export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
export const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior", "Lead"];
export const REMOTE_OPTIONS = ["remote", "hybrid", "on-site"];
export const SEEKER_PLANS = [
  { key: "free", name: "Free", price: 0, features: ["3 applications/month", "10 saved jobs", "Basic profile"] },
  { key: "pro", name: "Pro", price: 19, features: ["30 applications/month", "Unlimited saved jobs", "Application tracking", "Salary insights"], highlight: true },
  { key: "premium", name: "Premium", price: 39, features: ["Unlimited applications", "Profile boost", "Early job access", "Priority support"] },
];

export const RECRUITER_PLANS = [
  { key: "free", name: "Free", price: 0, features: ["3 active jobs", "Basic applicant management"] },
  { key: "growth", name: "Growth", price: 49, features: ["10 active jobs", "Applicant tracking", "Basic analytics"], highlight: true },
  { key: "enterprise", name: "Enterprise", price: 149, features: ["50 active jobs", "Advanced analytics", "Featured listings", "Team collaboration", "Custom branding"] },
];