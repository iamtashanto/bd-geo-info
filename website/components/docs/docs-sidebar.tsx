'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docsNav, DocNavSection } from '@/lib/docs-data';
import { ChevronRight } from 'lucide-react';

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <nav className="sticky top-24 overflow-y-auto max-h-[calc(100vh-6rem)] pr-2 pb-8">
        {docsNav.map((section: DocNavSection) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2 px-3">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {active && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

