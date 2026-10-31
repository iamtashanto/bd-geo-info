'use client';

import { Coffee, Heart } from 'lucide-react';

export function FloatingSupport() {
  return (
    <aside aria-label="Support the project" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://www.supportkori.com/iamtashanto"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Support TA Shanto on SupportKori"
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-amber-500/30"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
        </span>
        <Coffee className="w-4 h-4 text-slate-900 group-hover:rotate-12 transition-transform duration-200" />
        <span>Support Project</span>
        <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 ml-0.5" />
      </a>
    </aside>
  );
}

