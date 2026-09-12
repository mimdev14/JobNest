import DashboardGate from "@/components/DashboardGate";
import DashboardSidebar from "@/components/DashboardSidebar";

const LINKS = [
  { href: "/dashboard/recruiter", label: "Overview" },
  { href: "/dashboard/recruiter/jobs", label: "My Jobs" },
  { href: "/dashboard/recruiter/jobs/new", label: "Post a Job" },
  { href: "/dashboard/recruiter/pipeline", label: "Candidate Pipeline" },
  { href: "/dashboard/recruiter/talent", label: "Talent Search" },
  { href: "/dashboard/recruiter/company", label: "Company Profile" },
  { href: "/dashboard/recruiter/billing", label: "Billing" },
];

export default function RecruiterLayout({ children }) {
  return (
    <DashboardGate allowedRole="RECRUITER">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <DashboardSidebar title="Recruiter" links={LINKS} />
        <main className="flex-1">{children}</main>
      </div>
    </DashboardGate>
  );
}