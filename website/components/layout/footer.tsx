import Link from 'next/link';
import { MapPin, Github, Package, Heart, ExternalLink, Globe } from 'lucide-react';

const footerLinks = {
  Documentation: [
    { label: 'Introduction', href: '/docs/introduction' },
    { label: 'Installation', href: '/docs/installation' },
    { label: 'Quick Start', href: '/docs/quick-start' },
    { label: 'API Reference', href: '/api-reference' },
  ],
  Explore: [
    { label: 'Playground', href: '/playground' },
    { label: 'Explorer', href: '/explorer' },
    { label: 'Examples', href: '/examples' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Developer: [
    { label: 'TA Shanto', href: 'https://tashanto.com', external: true },
    { label: 'SupportKori', href: 'https://www.supportkori.com/iamtashanto', external: true },
    { label: 'GitHub Profile', href: 'https://github.com/iamtashanto', external: true },
    { label: 'Report an Issue', href: 'https://github.com/iamtashanto/bd-geo-info/issues', external: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-3">
              <MapPin className="w-5 h-5 text-indigo-600" />
              bd-geo-info
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-4">
              Comprehensive Bangladesh geographical data library — divisions, districts, upazilas, unions, and postal codes for JavaScript & TypeScript.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://tashanto.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50 hover:bg-indigo-100 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                tashanto.com
              </a>
              <a
                href="https://github.com/iamtashanto/bd-geo-info"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.npmjs.com/package/bd-geo-info"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="npm"
              >
                <Package className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 Developed by{' '}
            <a
              href="https://tashanto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-900 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4"
            >
              TA Shanto
            </a>
            . Released under the MIT License.
          </p>
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> in Bangladesh 🇧🇩
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
