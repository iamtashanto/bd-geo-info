import type { Metadata } from 'next';
import { CodeBlock } from '@/components/docs/code-block';

export const metadata: Metadata = {
  title: 'API Reference',
  description: 'Complete API reference for all bd-geo-info functions — getDivisions, getDistricts, getUpazilas, getUnions, getPostCodes, formatAddress, validatePostCode.',
};

const apis = [
  {
    name: 'getDivisions',
    signature: `getDivisions(language?: 'en' | 'bn'): Promise<{ value: string; label: string }[]>`,
    description: 'Returns all 8 Bangladesh divisions. Default language is English.',
    params: [
      { name: 'language', type: "'en' | 'bn'", default: "'en'", desc: 'Language for label strings' },
    ],
    example: `import { getDivisions } from 'bd-geo-info';

const divisions = await getDivisions('en');
// [{ value: '1', label: 'Barisal' }, { value: '3', label: 'Dhaka' }, ...]

const bn = await getDivisions('bn');
// [{ value: '1', label: 'বরিশাল' }, ...]`,
  },
  {
    name: 'getDistricts',
    signature: `getDistricts(divisionId: string, language?: 'en' | 'bn'): Promise<{ value: string; label: string }[]>`,
    description: 'Returns all districts for the given division ID.',
    params: [
      { name: 'divisionId', type: 'string', default: '—', desc: 'The division ID (e.g. "3" for Dhaka)' },
      { name: 'language', type: "'en' | 'bn'", default: "'en'", desc: 'Language for label strings' },
    ],
    example: `const districts = await getDistricts('3', 'en');
// [{ value: '47', label: 'Dhaka' }, { value: '41', label: 'Gazipur' }, ...]`,
  },
  {
    name: 'getUpazilas',
    signature: `getUpazilas(districtId: string, language?: 'en' | 'bn'): Promise<{
  id: string; district_id: string; name: string; bn_name: string;
  value: string; label: string; url?: string;
}[]>`,
    description: 'Returns all upazilas / thanas for the given district ID. Returns extended objects including raw fields.',
    params: [
      { name: 'districtId', type: 'string', default: '—', desc: 'The district ID (e.g. "47" for Dhaka)' },
      { name: 'language', type: "'en' | 'bn'", default: "'en'", desc: 'Language for label strings' },
    ],
    example: `const upazilas = await getUpazilas('47', 'en');
// [{ id: '530', district_id: '47', name: 'Mirpur', bn_name: '...', value: '530', label: 'Mirpur' }, ...]`,
  },
  {
    name: 'getUnions',
    signature: `getUnions(upazilaId: string, language?: 'en' | 'bn'): Promise<{ value: string; label: string; url?: string }[]>`,
    description: 'Returns unions for the given upazila. Returns an empty array for metropolitan thanas.',
    params: [
      { name: 'upazilaId', type: 'string', default: '—', desc: 'The upazila ID' },
      { name: 'language', type: "'en' | 'bn'", default: "'en'", desc: 'Language for label strings' },
    ],
    example: `const unions = await getUnions('365', 'en');
// [{ value: '3272', label: 'Birulia' }, ...]

// Metropolitan thana — returns []
const empty = await getUnions('530', 'en'); // []`,
  },
  {
    name: 'getPostCodes',
    signature: `getPostCodes(districtId: string | null, upazila?: string): Promise<PostCode[]>`,
    description: 'Returns postcodes for a district, optionally filtered by upazila name string.',
    params: [
      { name: 'districtId', type: 'string | null', default: '—', desc: 'District ID; returns [] if null' },
      { name: 'upazila', type: 'string', default: 'undefined', desc: 'Optional upazila name filter' },
    ],
    example: `const codes = await getPostCodes('47');
// [{ division_id: '3', district_id: '47', upazila: 'Mirpur', postOffice: 'Mirpur-10', postCode: '1216' }, ...]`,
  },
  {
    name: 'formatAddress',
    signature: `formatAddress(
  division: string,
  district: string,
  upazila: string,
  union: string,
  postCode: string,
  street: string,
  language?: 'en' | 'bn'
): Promise<string>`,
    description: 'Formats a complete human-readable address from component IDs. Returns an empty string if any required entity is not found.',
    params: [
      { name: 'division', type: 'string', default: '—', desc: 'Division ID' },
      { name: 'district', type: 'string', default: '—', desc: 'District ID' },
      { name: 'upazila', type: 'string', default: '—', desc: 'Upazila ID' },
      { name: 'union', type: 'string', default: '—', desc: 'Union ID' },
      { name: 'postCode', type: 'string', default: '—', desc: 'Postal code string' },
      { name: 'street', type: 'string', default: '—', desc: 'Street address' },
      { name: 'language', type: "'en' | 'bn'", default: "'en'", desc: 'Output language' },
    ],
    example: `const addr = await formatAddress('3', '47', '365', '3272', '1216', '12/A Road 5', 'en');
// "12/A Road 5, Birulia, ..., Dhaka-1216, Dhaka"`,
  },
  {
    name: 'validatePostCode',
    signature: `validatePostCode(postCode: string): boolean`,
    description: 'Validates that a string is a valid Bangladesh postcode — exactly 4 numeric digits.',
    params: [
      { name: 'postCode', type: 'string', default: '—', desc: 'The postcode string to validate' },
    ],
    example: `validatePostCode('1207'); // true
validatePostCode('12');   // false
validatePostCode('abcd'); // false`,
  },
];

export default function ApiReferencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">API Reference</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Complete reference for all exported functions in <code className="code-inline">bd-geo-info</code>.
        </p>
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-2 mb-10">
        {apis.map((api) => (
          <a
            key={api.name}
            href={`#${api.name}`}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-lg text-sm font-mono transition-colors"
          >
            {api.name}
          </a>
        ))}
      </div>

      <div className="space-y-16">
        {apis.map((api) => (
          <section key={api.name} id={api.name} className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-mono">{api.name}</h2>
              <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded font-medium">
                Function
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{api.description}</p>

            {/* Signature */}
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Signature</h3>
            <CodeBlock code={api.signature} language="typescript" />

            {/* Params */}
            {api.params.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 mt-6">Parameters</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2.5 pr-4 font-semibold text-slate-700 dark:text-slate-300">Parameter</th>
                        <th className="text-left py-2.5 pr-4 font-semibold text-slate-700 dark:text-slate-300">Type</th>
                        <th className="text-left py-2.5 pr-4 font-semibold text-slate-700 dark:text-slate-300">Default</th>
                        <th className="text-left py-2.5 font-semibold text-slate-700 dark:text-slate-300">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {api.params.map((p) => (
                        <tr key={p.name}>
                          <td className="py-2.5 pr-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs">{p.name}</td>
                          <td className="py-2.5 pr-4 font-mono text-slate-500 text-xs">{p.type}</td>
                          <td className="py-2.5 pr-4 text-slate-500 text-xs">{p.default}</td>
                          <td className="py-2.5 text-slate-600 dark:text-slate-400 text-xs">{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Example */}
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 mt-6">Example</h3>
            <CodeBlock code={api.example} language="typescript" />
          </section>
        ))}
      </div>

      {/* Types section */}
      <section id="types" className="scroll-mt-24 mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">TypeScript Types</h2>
        <CodeBlock language="typescript" filename="bd-geo-info types" code={`// Exported from 'bd-geo-info'
export interface Division {
  id: string; name: string; bn_name: string;
  lat: string; long: string; url?: string;
}

export interface District {
  id: string; division_id: string; name: string; bn_name: string;
  lat: string; long: string; url?: string;
}

export interface Upazila {
  id: string; district_id: string; name: string; bn_name: string; url?: string;
}

export interface UnionData {
  id: string; upazilla_id: string; name: string; bn_name: string; url: string;
}

export interface PostCode {
  district?: string; division_id: string; district_id?: string;
  upazila: string; postOffice: string; postCode: string;
}

export interface AddressFormData {
  division?: string; district?: string; upazila?: string;
  union?: string; postCode?: string; street?: string;
}

export interface Theme {
  colors?: { primary?: string; background?: string; border?: string; };
  borderRadius?: string;
  fontSize?: { input?: string; };
  spacing?: { input?: string; label?: string; };
}`} />
      </section>
    </div>
  );
}

