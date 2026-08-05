import {
  BriefcaseBusiness,
  Building2,
  Users,
  BadgeCheck,
} from "lucide-react";

import StatCard from "./StatCard";

const stats = [
  {
    id: 1,
    icon: BriefcaseBusiness,
    value: "15K+",
    label: "Active Jobs",
  },
  {
    id: 2,
    icon: Building2,
    value: "2.5K+",
    label: "Companies",
  },
  {
    id: 3,
    icon: Users,
    value: "50K+",
    label: "Job Seekers",
  },
  {
    id: 4,
    icon: BadgeCheck,
    value: "98%",
    label: "Success Rate",
  },
];

export default function StatsSection() {
  return (
    <section className="mt-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          Trusted Platform
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
          Your Career Journey Starts Here
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-300">
          Join thousands of job seekers and recruiters who trust JobNest
          to connect talent with the right opportunities.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}