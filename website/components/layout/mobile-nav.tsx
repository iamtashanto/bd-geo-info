'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, MapPin, Github, Package } from 'lucide-react';
import { useEffect } from 'react';

const navLinks = [
  { href: '/docs', label: 'Docs' },
  { href: '/api-reference', label: 'API Reference' },
  { href: '/playground', label: 'Playground' },
  { href: '/explorer', label: 'Explorer' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/examples', label: 'Examples' },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-950 shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" onClick={onClose} className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <MapPin className="w-5 h-5 text-indigo-600" />
            bd-geo-info
          </Link>
          <button onClick={onClose} className="p-2 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
          <a
            href="https://github.com/iamtashanto/bd-geo-info"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/bd-geo-info"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <Package className="w-4 h-4" /> npm
          </a>
        </div>
      </div>
    </div>
  );
}

