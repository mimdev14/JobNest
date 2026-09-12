import DashboardGate from "@/components/DashboardGate";
import DashboardSidebar from "@/components/DashboardSidebar";

const LINKS = [
  { href: "/dashboard/seeker", label: "Overview" },
  { href: "/dashboard/seeker/applications", label: "My Applications" },
  { href: "/dashboard/seeker/saved", label: "Saved Jobs" },
  { href: "/dashboard/seeker/alerts", label: "Job Alerts" },
  { href: "/dashboard/seeker/profile", label: "Profile" },
  { href: "/dashboard/seeker/billing", label: "Billing" },
];

export default function SeekerLayout({ children }) {
  return (
    <DashboardGate allowedRole="SEEKER">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <DashboardSidebar title="Seeker" links={LINKS} />
        <main className="flex-1">{children}</main>
      </div>
    </DashboardGate>
  );
}