import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50">
          {job.companyLogo ? <img src={job.companyLogo} alt={job.companyName} className="h-full w-full object-cover" /> : <span className="text-lg font-bold text-blue-600">{job.companyName?.[0]}</span>}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.companyName}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
        <span className="rounded-full bg-gray-100 px-2.5 py-1">{job.location}</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 capitalize">{job.remote}</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1">{job.type}</span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-sm font-semibold text-gray-900">
          {job.salary ? `${job.currency} ${job.salary.toLocaleString()}` : "Salary not disclosed"}
        </span>
        <Link href={`/jobs/${job._id}`} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700">
          View Details
        </Link>
      </div>
    </div>
  );
}