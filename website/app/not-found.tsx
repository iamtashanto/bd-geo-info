import Link from 'next/link';
import { MapPin, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-6">
        <MapPin className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Location Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Looks like this page wandered off the map. Let&apos;s get you back to
          familiar territory.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/"
          className="btn-primary"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <Link
          href="/docs"
          className="btn-secondary"
        >
          View Docs
        </Link>
      </div>
    </div>
  );
}

