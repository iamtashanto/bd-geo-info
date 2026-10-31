import Link from 'next/link';
import { MapPin, Github, Package, Heart, ExternalLink } from 'lucide-react';

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
  External: [
    { label: 'GitHub', href: 'https://github.com/iamtashanto/bd-geo-info', external: true },
    { label: 'npm Package', href: 'https://www.npmjs.com/package/bd-geo-info', external: true },
    { label: 'SupportKori', href: 'https://www.supportkori.com/iamtashanto', external: true },
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
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              A lightweight TypeScript library with bilingual geographical data for Bangladesh.
              Zero required dependencies.
            </p>
            <div className="flex items-center gap-3 mt-4">
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
                        className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
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
            © 2026{' '}
            <a
              href="https://tashanto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              TA Shanto
            </a>
            . Released under the MIT License.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Bangladesh 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
}

