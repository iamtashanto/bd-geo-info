import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Benchmarks and Package Comparison',
  description: 'Understand bd-geo-info bundle choices, lookup behavior and feature coverage.',
  path: '/benchmarks',
});

export default function BenchmarksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">Benchmarks and comparison</h1>
      <p className="mb-10 text-lg text-slate-600 dark:text-slate-400">
        bd-geo-info is designed for Bangladesh-first applications that need reliable local data without an API call.
      </p>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr><th className="p-4">Capability</th><th className="p-4">bd-geo-info</th><th className="p-4">Typical generic geo package</th></tr>
          </thead>
          <tbody>
            {[
              ['Bangladesh administrative hierarchy', 'Included', 'Often unavailable'],
              ['English + বাংলা names', 'Included', 'Usually English only'],
              ['All-location search and aliases', 'Included', 'Usually custom work'],
              ['Postcode and post-office lookup', 'Included', 'Provider-dependent'],
              ['Offline / no API key', 'Included', 'Often API-dependent'],
              ['React UI and TypeScript types', 'Optional subpath', 'Varies'],
            ].map(([label, packageValue, genericValue]) => (
              <tr key={label} className="border-t border-slate-200 dark:border-slate-800">
                <td className="p-4 font-medium text-slate-900 dark:text-white">{label}</td>
                <td className="p-4 text-emerald-600">{packageValue}</td>
                <td className="p-4 text-slate-500">{genericValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-xs text-slate-500">Feature comparison is qualitative; benchmark results depend on runtime, bundle mode and application data.</p>
    </div>
  );
}
