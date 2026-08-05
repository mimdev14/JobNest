import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-bold text-blue-600"
            >
              JobNest
            </Link>

            <p className="mt-4 max-w-sm text-gray-600">
              Helping professionals find their dream jobs and empowering
              companies to hire the best talent.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                {/* Facebook */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12A10 10 0 1 0 10.44 21.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.88h-2.33v6.99A10 10 0 0 0 22 12Z" />
                </svg>
              </a>

              <a href="#" className="text-gray-500 hover:text-blue-600">
                {/* LinkedIn */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1.02 4.6 1.02 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2Zm.02 3.5H1v16h4V7Zm6.5 0h-4v16h4v-8.4c0-4.67 6-5.05 6 0V23h4v-9.75c0-7.22-7.92-6.96-10-3.4V7Z" />
                </svg>
              </a>

              <a href="#" className="text-gray-500 hover:text-blue-600">
                {/* GitHub */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6A4.7 4.7 0 0 1 6 8.4a4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.6 11.6 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.3 3.3c0 4.6-2.8 5.7-5.5 6 .5.4.8 1.1.8 2.3v3.3c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-gray-600">
              <li><Link href="/jobs">Browse Jobs</Link></li>
              <li><Link href="/companies">Companies</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>

            <ul className="space-y-3 text-gray-600">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/press">Press</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>

            <ul className="space-y-3 text-gray-600">
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} JobNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}