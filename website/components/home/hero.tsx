import Link from 'next/link';
import { Github, Package, ArrowRight, MapPin } from 'lucide-react';
import { AddressPreview } from '@/components/playground/address-preview';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 pt-16 pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-6">
              <MapPin className="w-3.5 h-3.5" />
              v5.1.1 — Latest Release
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Bangladesh Geographical Data,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
                Made Simple.
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              A lightweight, zero-dependency TypeScript library with bilingual (EN / বাংলা) geographical data, instant all-Bangladesh search, address validation and coordinate utilities —{' '}
              <strong className="text-slate-800 dark:text-slate-200">8 divisions</strong>,{' '}
              <strong className="text-slate-800 dark:text-slate-200">64 districts</strong>,{' '}
              <strong className="text-slate-800 dark:text-slate-200">610 upazilas</strong>,{' '}
              <strong className="text-slate-800 dark:text-slate-200">4,540 unions</strong>, and{' '}
              <strong className="text-slate-800 dark:text-slate-200">1,324 postcodes</strong>.
            </p>

            {/* Install command */}
            <div className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-800 rounded-xl px-4 py-3 mb-8 font-mono text-sm text-slate-300 border border-slate-700 max-w-full">
              <span className="text-indigo-400 select-none">$</span>
              <span className="flex-1">npm install bd-geo-info</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <Link href="/docs/quick-start" className="btn-primary">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/playground" className="btn-secondary">
                Try Playground
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs">
              <a
                href="https://tashanto.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 rounded-full text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
              >
                <span>Created by TA Shanto</span>
              </a>
              <a
                href="https://www.supportkori.com/iamtashanto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/60 rounded-full text-amber-900 dark:text-amber-200 font-medium hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors"
              >
                <span>☕ Support Project</span>
              </a>
              <a
                href="https://www.npmjs.com/package/bd-geo-info"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Package className="w-3.5 h-3.5" /> npm v5.1.1
              </a>
              <a
                href="https://github.com/iamtashanto/bd-geo-info"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                MIT License
              </span>
              <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                TypeScript
              </span>
            </div>
          </div>

          {/* Right: interactive preview */}
          <div className="lg:block">
            <AddressPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
