import type { Metadata } from 'next';
import { LocationPlayground } from '@/components/playground/location-playground';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Interactively explore Bangladesh geographical data — division, district, upazila, and union selector with bilingual support.',
};

export default function PlaygroundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Playground</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Interactively explore Bangladesh geographical data using the live <code className="code-inline">bd-geo-info</code> package.
          Select any division → district → upazila → union and see the returned JSON in real time.
        </p>
      </div>
      <LocationPlayground />
    </div>
  );
}

