'use client';

import { useState, useEffect } from 'react';
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';
import { ChevronRight, ChevronDown, Search, Globe, Copy, Check } from 'lucide-react';

type Lang = 'en' | 'bn';
type Option = { value: string; label: string };

function CopyIcon({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function ExplorerPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [search, setSearch] = useState('');
  const [divisions, setDivisions] = useState<Option[]>([]);

  const [expandedDivision, setExpandedDivision] = useState<string | null>(null);
  const [districts, setDistricts] = useState<Record<string, Option[]>>({});

  const [expandedDistrict, setExpandedDistrict] = useState<string | null>(null);
  const [upazilas, setUpazilas] = useState<Record<string, Option[]>>({});

  const [expandedUpazila, setExpandedUpazila] = useState<string | null>(null);
  const [unions, setUnions] = useState<Record<string, Option[]>>({});

  useEffect(() => {
    getDivisions(lang).then(setDivisions);
    setExpandedDivision(null);
    setDistricts({});
    setExpandedDistrict(null);
    setUpazilas({});
    setExpandedUpazila(null);
    setUnions({});
  }, [lang]);

  const toggleDivision = async (id: string) => {
    if (expandedDivision === id) { setExpandedDivision(null); return; }
    setExpandedDivision(id);
    if (!districts[id]) {
      const data = await getDistricts(id, lang);
      setDistricts((prev) => ({ ...prev, [id]: data }));
    }
    setExpandedDistrict(null);
    setExpandedUpazila(null);
  };

  const toggleDistrict = async (id: string) => {
    if (expandedDistrict === id) { setExpandedDistrict(null); return; }
    setExpandedDistrict(id);
    if (!upazilas[id]) {
      const data = await getUpazilas(id, lang);
      setUpazilas((prev) => ({ ...prev, [id]: data }));
    }
    setExpandedUpazila(null);
  };

  const toggleUpazila = async (id: string) => {
    if (expandedUpazila === id) { setExpandedUpazila(null); return; }
    setExpandedUpazila(id);
    if (!unions[id]) {
      const data = await getUnions(id, lang);
      setUnions((prev) => ({ ...prev, [id]: data }));
    }
  };

  const filteredDivisions = divisions.filter((d) =>
    d.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Geographic Explorer</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Browse Bangladesh&apos;s full geographic hierarchy. Click any entry to expand it.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search divisions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
          <button
            onClick={() => setLang('en')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
          >
            <Globe className="w-3 h-3" /> EN
          </button>
          <button
            onClick={() => setLang('bn')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${lang === 'bn' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
          >
            বাং
          </button>
        </div>
      </div>

      {/* Tree */}
      <div className="card divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {filteredDivisions.map((div) => (
          <div key={div.value}>
            {/* Division row */}
            <button
              onClick={() => toggleDivision(div.value)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
            >
              {expandedDivision === div.value ? (
                <ChevronDown className="w-4 h-4 text-indigo-500 shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span className="flex-1 font-medium text-slate-900 dark:text-white">{div.label}</span>
              <span className="text-xs text-slate-400 font-mono">ID: {div.value}</span>
              <CopyIcon text={JSON.stringify(div)} />
            </button>

            {/* Districts */}
            {expandedDivision === div.value && (
              <div className="bg-slate-50/50 dark:bg-slate-900/30">
                {(districts[div.value] || []).map((dist) => (
                  <div key={dist.value}>
                    <button
                      onClick={() => toggleDistrict(dist.value)}
                      className="w-full flex items-center gap-3 pl-10 pr-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      {expandedDistrict === dist.value ? (
                        <ChevronDown className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">{dist.label}</span>
                      <span className="text-xs text-slate-400 font-mono">ID: {dist.value}</span>
                      <CopyIcon text={JSON.stringify(dist)} />
                    </button>

                    {/* Upazilas */}
                    {expandedDistrict === dist.value && (
                      <div className="bg-slate-100/50 dark:bg-slate-900/50">
                        {(upazilas[dist.value] || []).map((uz) => (
                          <div key={uz.value}>
                            <button
                              onClick={() => toggleUpazila(uz.value)}
                              className="w-full flex items-center gap-3 pl-16 pr-4 py-2.5 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-left"
                            >
                              {expandedUpazila === uz.value ? (
                                <ChevronDown className="w-3 h-3 text-indigo-400 shrink-0" />
                              ) : (
                                <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                              )}
                              <span className="flex-1 text-xs text-slate-600 dark:text-slate-400">{uz.label}</span>
                              <span className="text-xs text-slate-400 font-mono">ID: {uz.value}</span>
                              <CopyIcon text={JSON.stringify(uz)} />
                            </button>

                            {/* Unions */}
                            {expandedUpazila === uz.value && (
                              <div className="pl-20 pr-4 py-2 bg-slate-200/30 dark:bg-slate-950/30">
                                {unions[uz.value]?.length === 0 ? (
                                  <p className="text-xs text-slate-400 py-1">Metropolitan thana — no unions.</p>
                                ) : (
                                  <ul className="grid grid-cols-2 gap-1">
                                    {(unions[uz.value] || []).map((u) => (
                                      <li key={u.value} className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 py-0.5">
                                        <span>{u.label}</span>
                                        <span className="font-mono text-slate-400">#{u.value}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

