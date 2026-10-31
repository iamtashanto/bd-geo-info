import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { docsNav } from '@/lib/docs-data';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Complete documentation for the bd-geo-info package — installation, API reference, React components, and examples.',
};

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-10">
        <DocsSidebar />
        <div className="flex-1 min-w-0">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Documentation</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              bd-geo-info Documentation
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Everything you need to get started with Bangladesh geographical data in your JavaScript or TypeScript project.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {docsNav.map((section) => (
              <div key={section.title} className="card p-5">
                <h2 className="font-semibold text-slate-900 dark:text-white mb-3">{section.title}</h2>
                <ul className="space-y-1.5">
                  {section.items.slice(0, 4).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                      >
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  {section.items.length > 4 && (
                    <li className="text-xs text-slate-400">+{section.items.length - 4} more</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

