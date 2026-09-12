import DashboardGate from "@/components/DashboardGate";
import DashboardSidebar from "@/components/DashboardSidebar";

const LINKS = [
  { href: "/dashboard/admin", label: "Overview" },
  { href: "/dashboard/admin/users", label: "Manage Users" },
  { href: "/dashboard/admin/companies", label: "Manage Companies" },
  { href: "/dashboard/admin/jobs", label: "Moderate Jobs" },
  { href: "/dashboard/admin/payments", label: "Payments" },
];

export default function AdminLayout({ children }) {
  return (
    <DashboardGate allowedRole="ADMIN">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <DashboardSidebar title="Admin" links={LINKS} />
        <main className="flex-1">{children}</main>
      </div>
    </DashboardGate>
  );
}