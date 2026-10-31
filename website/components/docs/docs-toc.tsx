export function DocsToc({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  if (!headings.length) return null;
  return (
    <aside className="w-52 shrink-0 hidden xl:block">
      <div className="sticky top-24">
        <p className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
          On this page
        </p>
        <ul className="space-y-1.5">
          {headings.map((h) => (
            <li
              key={h.id}
              style={{ paddingLeft: h.level === 3 ? '0.75rem' : '0' }}
            >
              <a
                href={`#${h.id}`}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors leading-snug block"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

