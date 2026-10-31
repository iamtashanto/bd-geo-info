'use client';

import { useState, useEffect } from 'react';
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';
import { MapPin } from 'lucide-react';
import { CopyButton } from '@/components/docs/copy-button';

type Option = { value: string; label: string };

export function AddressPreview() {
  const [divisions, setDivisions] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [upazilas, setUpazilas] = useState<Option[]>([]);
  const [unions, setUnions] = useState<Option[]>([]);

  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [union, setUnion] = useState('');

  useEffect(() => {
    getDivisions('en').then(setDivisions);
  }, []);

  useEffect(() => {
    if (!division) { setDistricts([]); setDistrict(''); return; }
    getDistricts(division, 'en').then(setDistricts);
    setDistrict(''); setUpazilas([]); setUpazila(''); setUnions([]); setUnion('');
  }, [division]);

  useEffect(() => {
    if (!district) { setUpazilas([]); setUpazila(''); return; }
    getUpazilas(district, 'en').then(setUpazilas);
    setUpazila(''); setUnions([]); setUnion('');
  }, [district]);

  useEffect(() => {
    if (!upazila) { setUnions([]); setUnion(''); return; }
    getUnions(upazila, 'en').then(setUnions);
    setUnion('');
  }, [upazila]);

  const divisionLabel = divisions.find((d) => d.value === division)?.label || '';
  const districtLabel = districts.find((d) => d.value === district)?.label || '';
  const upazilaLabel = upazilas.find((d) => d.value === upazila)?.label || '';
  const unionLabel = unions.find((d) => d.value === union)?.label || '';

  const addressParts = [unionLabel, upazilaLabel, districtLabel, divisionLabel].filter(Boolean);
  const formattedAddress = addressParts.join(', ') + (addressParts.length ? ', Bangladesh' : '');

  return (
    <div className="card p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-5">
        <MapPin className="w-4 h-4 text-indigo-600" />
        <span className="font-semibold text-slate-900 dark:text-white text-sm">Interactive Address Selector</span>
      </div>

      <div className="space-y-3 mb-5">
        <select
          className="select-field text-sm"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        >
          <option value="">Select Division</option>
          {divisions.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>

        <select
          className="select-field text-sm"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          disabled={!division}
        >
          <option value="">Select District</option>
          {districts.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>

        <select
          className="select-field text-sm"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          disabled={!district}
        >
          <option value="">Select Upazila</option>
          {upazilas.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>

        <select
          className="select-field text-sm"
          value={union}
          onChange={(e) => setUnion(e.target.value)}
          disabled={!upazila || unions.length === 0}
        >
          <option value="">Select Union</option>
          {unions.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
      </div>

      {addressParts.length > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 rounded-lg p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm text-indigo-800 dark:text-indigo-200 font-medium leading-relaxed flex-1">
              {formattedAddress}
            </p>
            <CopyButton text={formattedAddress} />
          </div>
        </div>
      )}

      {addressParts.length === 0 && (
        <div className="text-center py-6 text-slate-400 text-sm">
          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
          Select a division to start
        </div>
      )}
    </div>
  );
}

