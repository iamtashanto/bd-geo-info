'use client';

import { useState, useEffect } from 'react';
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';
import { RotateCcw, Globe } from 'lucide-react';
import { CopyButton } from '@/components/docs/copy-button';

type Lang = 'en' | 'bn';
type Option = { value: string; label: string };

export function LocationPlayground() {
  const [lang, setLang] = useState<Lang>('en');
  const [divisions, setDivisions] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [upazilas, setUpazilas] = useState<Option[]>([]);
  const [unions, setUnions] = useState<Option[]>([]);

  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [union, setUnion] = useState('');

  const [loading, setLoading] = useState({ divisions: false, districts: false, upazilas: false, unions: false });

  // Load divisions on mount and lang change
  useEffect(() => {
    setLoading((l) => ({ ...l, divisions: true }));
    getDivisions(lang).then((data) => {
      setDivisions(data);
      setLoading((l) => ({ ...l, divisions: false }));
    });
    // Reset dependent
    setDivision('');
    setDistricts([]);
    setDistrict('');
    setUpazilas([]);
    setUpazila('');
    setUnions([]);
    setUnion('');
  }, [lang]);

  // Load districts when division changes
  useEffect(() => {
    if (!division) { setDistricts([]); setDistrict(''); return; }
    setLoading((l) => ({ ...l, districts: true }));
    getDistricts(division, lang).then((data) => {
      setDistricts(data);
      setDistrict('');
      setLoading((l) => ({ ...l, districts: false }));
    });
    setUpazilas([]); setUpazila(''); setUnions([]); setUnion('');
  }, [division, lang]);

  // Load upazilas when district changes
  useEffect(() => {
    if (!district) { setUpazilas([]); setUpazila(''); return; }
    setLoading((l) => ({ ...l, upazilas: true }));
    getUpazilas(district, lang).then((data) => {
      setUpazilas(data);
      setUpazila('');
      setLoading((l) => ({ ...l, upazilas: false }));
    });
    setUnions([]); setUnion('');
  }, [district, lang]);

  // Load unions when upazila changes
  useEffect(() => {
    if (!upazila) { setUnions([]); setUnion(''); return; }
    setLoading((l) => ({ ...l, unions: true }));
    getUnions(upazila, lang).then((data) => {
      setUnions(data);
      setUnion('');
      setLoading((l) => ({ ...l, unions: false }));
    });
  }, [upazila, lang]);

  const reset = () => {
    setDivision(''); setDistrict(''); setUpazila(''); setUnion('');
  };

  const selectionJson = JSON.stringify(
    {
      division: divisions.find((d) => d.value === division) || null,
      district: districts.find((d) => d.value === district) || null,
      upazila: upazilas.find((d) => d.value === upazila) || null,
      union: unions.find((d) => d.value === union) || null,
    },
    null,
    2
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-slate-900 dark:text-white">Select Location</h2>
          <div className="flex items-center gap-2">
            {/* Lang toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setLang('en')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              >
                <Globe className="w-3 h-3" /> EN
              </button>
              <button
                onClick={() => setLang('bn')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${lang === 'bn' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              >
                বাং
              </button>
            </div>
            <button
              onClick={reset}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Division */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Division {loading.divisions && <span className="text-indigo-500">Loading...</span>}
            </label>
            <select
              className="select-field"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              disabled={loading.divisions}
            >
              <option value="">{lang === 'en' ? '— Select Division —' : '— বিভাগ নির্বাচন করুন —'}</option>
              {divisions.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              District {loading.districts && <span className="text-indigo-500">Loading...</span>}
            </label>
            <select
              className="select-field"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!division || loading.districts}
            >
              <option value="">{lang === 'en' ? '— Select District —' : '— জেলা নির্বাচন করুন —'}</option>
              {districts.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Upazila / Thana {loading.upazilas && <span className="text-indigo-500">Loading...</span>}
            </label>
            <select
              className="select-field"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              disabled={!district || loading.upazilas}
            >
              <option value="">{lang === 'en' ? '— Select Upazila —' : '— উপজেলা নির্বাচন করুন —'}</option>
              {upazilas.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* Union */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Union {loading.unions && <span className="text-indigo-500">Loading...</span>}
            </label>
            <select
              className="select-field"
              value={union}
              onChange={(e) => setUnion(e.target.value)}
              disabled={!upazila || loading.unions}
            >
              <option value="">{lang === 'en' ? '— Select Union —' : '— ইউনিয়ন নির্বাচন করুন —'}</option>
              {unions.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            {upazila && unions.length === 0 && !loading.unions && (
              <p className="text-xs text-slate-400 mt-1">No unions for this upazila (metropolitan thana).</p>
            )}
          </div>
        </div>
      </div>

      {/* JSON Output */}
      <div className="card p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900 dark:text-white">Selected Data</h2>
          <CopyButton text={selectionJson} />
        </div>
        <pre className="flex-1 text-xs text-slate-300 bg-slate-900 dark:bg-slate-950 rounded-lg p-4 overflow-auto min-h-48 font-mono leading-relaxed">
          <code>{selectionJson}</code>
        </pre>
      </div>
    </div>
  );
}

