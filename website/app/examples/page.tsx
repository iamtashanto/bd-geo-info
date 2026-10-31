import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/docs/code-block';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Code examples for bd-geo-info — React, Next.js, Vue, Angular, and more.',
};

const examples = [
  {
    title: 'Basic Address Form (React)',
    description: 'A simple cascading address form using React hooks.',
    code: `'use client';
import { useState, useEffect } from 'react';
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';

export function AddressForm() {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);

  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [union, setUnion] = useState('');

  useEffect(() => { getDivisions('en').then(setDivisions); }, []);
  useEffect(() => {
    if (!division) return setDistricts([]);
    getDistricts(division, 'en').then(setDistricts);
    setDistrict(''); setUpazila(''); setUnion('');
  }, [division]);
  useEffect(() => {
    if (!district) return setUpazilas([]);
    getUpazilas(district, 'en').then(setUpazilas);
    setUpazila(''); setUnion('');
  }, [district]);
  useEffect(() => {
    if (!upazila) return setUnions([]);
    getUnions(upazila, 'en').then(setUnions);
    setUnion('');
  }, [upazila]);

  return (
    <form>
      <select value={division} onChange={e => setDivision(e.target.value)}>
        <option value="">Select Division</option>
        {divisions.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>
      <select value={district} onChange={e => setDistrict(e.target.value)} disabled={!division}>
        <option value="">Select District</option>
        {districts.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>
      <select value={upazila} onChange={e => setUpazila(e.target.value)} disabled={!district}>
        <option value="">Select Upazila</option>
        {upazilas.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
      </select>
      <select value={union} onChange={e => setUnion(e.target.value)} disabled={!upazila}>
        <option value="">Select Union</option>
        {unions.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
      </select>
    </form>
  );
}`,
    language: 'tsx',
  },
  {
    title: 'Bangla Language Form',
    description: 'Render all labels in Bangla by passing "bn" as the language parameter.',
    code: `import { getDivisions, getDistricts } from 'bd-geo-info';

const divisions = await getDivisions('bn');
// [{ value: '1', label: 'বরিশাল' }, { value: '3', label: 'ঢাকা' }, ...]

const districts = await getDistricts('3', 'bn');
// [{ value: '47', label: 'ঢাকা' }, { value: '41', label: 'গাজীপুর' }, ...]`,
    language: 'typescript',
  },
  {
    title: 'Next.js Server Component',
    description: 'Load divisions server-side and pass them to a client select component.',
    code: `// app/address/page.tsx (Server Component)
import { getDivisions } from 'bd-geo-info';
import { DivisionSelectClient } from './division-select-client';

export default async function AddressPage() {
  const divisions = await getDivisions('en');
  return <DivisionSelectClient initialDivisions={divisions} />;
}`,
    language: 'tsx',
  },
  {
    title: 'Postcode Lookup',
    description: 'Look up postcodes for a given district and upazila.',
    code: `import { getPostCodes, validatePostCode } from 'bd-geo-info';

// All postcodes for Dhaka district (id: '47')
const postcodes = await getPostCodes('47');

// Filter by upazila name
const mirpur = await getPostCodes('47', 'Mirpur');
// [{ postCode: '1216', postOffice: 'Mirpur TSO', upazila: 'Mirpur', ... }]

// Validate a postcode
validatePostCode('1207'); // true
validatePostCode('abc');  // false`,
    language: 'typescript',
  },
  {
    title: 'Vue 3 (Composition API)',
    description: 'Use bd-geo-info in a Vue 3 project with the Composition API.',
    code: `<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { getDivisions, getDistricts } from 'bd-geo-info';

const divisions = ref([]);
const districts = ref([]);
const selectedDivision = ref('');

onMounted(async () => { divisions.value = await getDivisions('en'); });
watch(selectedDivision, async (id) => {
  districts.value = id ? await getDistricts(id, 'en') : [];
});
</script>

<template>
  <select v-model="selectedDivision">
    <option value="">Select Division</option>
    <option v-for="d in divisions" :key="d.value" :value="d.value">{{ d.label }}</option>
  </select>
  <select :disabled="!selectedDivision">
    <option v-for="d in districts" :key="d.value" :value="d.value">{{ d.label }}</option>
  </select>
</template>`,
    language: 'vue',
  },
  {
    title: 'React Components (built-in)',
    description: 'Use the pre-built React components from bd-geo-info/react.',
    code: `import { AddressForm } from 'bd-geo-info/react';
import type { AddressFormData } from 'bd-geo-info/react';

export default function Page() {
  const handleChange = (data: AddressFormData) => {
    console.log(data);
    // { division: 'Dhaka', district: 'Dhaka', upazila: 'Savar', union: 'Birulia' }
  };

  return (
    <AddressForm
      language="en"
      onChange={handleChange}
      showPostCode
      showUnion
      validation={{
        division: { required: true },
        district: { required: true },
        upazila: { required: true },
      }}
    />
  );
}`,
    language: 'tsx',
  },
];

export default function ExamplesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Examples</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Ready-to-use code examples for common bd-geo-info use cases.
          Try the live{' '}
          <Link href="/playground" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Playground
          </Link>{' '}
          to interact with the data directly.
        </p>
      </div>

      <div className="space-y-12">
        {examples.map((ex, i) => (
          <section key={i} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{ex.title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{ex.description}</p>
            </div>
            <CodeBlock code={ex.code} language={ex.language} />
          </section>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Want to explore interactively?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          The Playground lets you select any Division → District → Upazila → Union
          and see the live JSON output from the actual package.
        </p>
        <Link href="/playground" className="btn-primary inline-flex">
          Open Playground <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

