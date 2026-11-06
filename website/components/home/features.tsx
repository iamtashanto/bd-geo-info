import {
  Zap,
  Globe2,
  Code2,
  Package,
  Database,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Zero Required Dependencies',
    description:
      'React is completely optional. The core library works in any JavaScript environment without pulling in unnecessary packages.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    icon: Globe2,
    title: 'Bilingual Support',
    description:
      'Full English and বাংলা support for all data points — divisions, districts, upazilas, and unions.',
    color: 'text-teal-500',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
  },
  {
    icon: Zap,
    title: 'O(1) Hash-Map Lookups',
    description:
      'Datasets indexed by parent ID for lightning-fast queries with no linear scans — even with large datasets.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    icon: Code2,
    title: 'Full TypeScript',
    description:
      'Strict types for all data shapes and component props — full IDE autocompletion and compile-time safety.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Package,
    title: 'Code-Split by Default',
    description:
      'Large datasets load on demand, not upfront. Dual CJS + ESM builds work with every bundler and module system.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Database,
    title: 'Comprehensive Data',
    description:
      '8 divisions · 64 districts · 610 upazilas (incl. metro thanas) · 4,540 unions · 1,324 postcodes. From official BBS sources.',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Shield,
    title: 'Validated & Provenance',
    description:
      'Every release validates JSON schema, relationships, and checksums. Data sourced from Bangladesh Bureau of Statistics.',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: Globe2,
    title: 'Search Every Location',
    description:
      'Search divisions, districts, upazilas, unions and post offices from one API using English, বাংলা, aliases or IDs.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
  },
  {
    icon: Shield,
    title: 'Address Validation',
    description:
      'Validate user-submitted location values and keep Bangladesh address forms consistent across your application.',
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
  },
  {
    icon: Globe2,
    title: 'Framework Agnostic',
    description:
      'Works with React, Next.js, Vue, Angular, Svelte, NestJS, Express, Bun, Deno, or plain Node.js.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Why bd-geo-info?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Built with developer experience in mind. Everything you need to work
            with Bangladesh geographical data in one small package.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.slice(0, 8).map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group"
            >
              <div className={`inline-flex p-2.5 rounded-lg ${feature.bg} mb-4`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { value: '8', label: 'Divisions' },
            { value: '64', label: 'Districts' },
            { value: '610', label: 'Upazilas' },
            { value: '4,540', label: 'Unions' },
            { value: '1,324', label: 'Postcodes' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-teal-50 dark:from-indigo-950/30 dark:to-teal-950/30 border border-indigo-100 dark:border-indigo-900/50"
            >
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
