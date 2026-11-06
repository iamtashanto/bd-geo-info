import { notFound } from 'next/navigation';
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { DocsToc } from '@/components/docs/docs-toc';
import { CodeBlock } from '@/components/docs/code-block';
import { findDocBySlug, getAdjacentDocs, docsNav } from '@/lib/docs-data';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string[] };
}

export async function generateStaticParams() {
  const allItems = docsNav.flatMap((s) => s.items);
  return allItems.map((item) => ({
    slug: item.href.replace('/docs/', '').split('/'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = findDocBySlug(params.slug);
  if (!doc) return { title: 'Not Found' };
  return {
    title: doc.title,
    description: doc.description,
  };
}

// Inline doc content map
function getDocContent(slug: string[]): React.ReactNode {
  const key = slug.join('/');

  const contents: Record<string, React.ReactNode> = {
    introduction: (
      <article className="prose-custom">
        <h1>Introduction</h1>
        <p className="lead">
          <strong>bd-geo-info</strong> is a lightweight, zero-dependency TypeScript library that provides structured,
          hierarchical geographical data for Bangladesh — bilingual in English and বাংলা.
        </p>
        <h2 id="what-is-it">What is bd-geo-info?</h2>
        <p>
          The library exposes async functions to retrieve divisions, districts, upazilas, unions, and postcodes.
          It ships in both CJS and ESM formats and works in every modern JavaScript runtime.
        </p>
        <h2 id="coverage">Data Coverage</h2>
        <ul>
          <li><strong>8 Divisions</strong></li>
          <li><strong>64 Districts</strong></li>
          <li><strong>610 Upazilas</strong> (including 107 metropolitan thanas)</li>
          <li><strong>4,540 Unions</strong></li>
          <li><strong>1,324 Postcodes</strong></li>
        </ul>
        <h2 id="why">Why bd-geo-info?</h2>
        <ul>
          <li>Zero required dependencies (React is optional)</li>
          <li>O(1) hash-map lookups — no linear scans</li>
          <li>Code-split by default — large datasets load on demand</li>
          <li>Full TypeScript with strict types</li>
          <li>Official BBS data sources</li>
        </ul>
      </article>
    ),
    installation: (
      <article className="prose-custom">
        <h1>Installation</h1>
        <p className="lead">Install bd-geo-info via your preferred package manager.</p>
        <h2 id="npm">npm</h2>
        <CodeBlock code="npm install bd-geo-info" language="bash" />
        <h2 id="yarn">yarn</h2>
        <CodeBlock code="yarn add bd-geo-info" language="bash" />
        <h2 id="pnpm">pnpm</h2>
        <CodeBlock code="pnpm add bd-geo-info" language="bash" />
        <h2 id="bun">bun</h2>
        <CodeBlock code="bun add bd-geo-info" language="bash" />
        <h2 id="react">React Components</h2>
        <p>React components are opt-in. Install React as a peer dependency:</p>
        <CodeBlock code="npm install bd-geo-info react react-dom" language="bash" />
        <p>Then import from the <code>/react</code> subpath:</p>
        <CodeBlock code={`import { AddressForm, DivisionSelect } from 'bd-geo-info/react';`} language="typescript" />
      </article>
    ),
    'quick-start': (
      <article className="prose-custom">
        <h1>Quick Start</h1>
        <p className="lead">Get up and running with bd-geo-info in under a minute.</p>
        <h2 id="basic-usage">Basic Usage</h2>
        <CodeBlock
          language="typescript"
          filename="example.ts"
          code={`import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';

// Fetch all divisions
const divisions = await getDivisions('en');
// [{ value: '1', label: 'Barisal' }, { value: '3', label: 'Dhaka' }, ...]

// Districts for Dhaka division (id: '3')
const districts = await getDistricts('3', 'en');

// Upazilas for Dhaka district (id: '47')
const upazilas = await getUpazilas('47', 'en');

// Unions for an upazila
const unions = await getUnions('365', 'en');

// Bangla output
const divisionsBn = await getDivisions('bn');
// [{ value: '1', label: 'বরিশাল' }, ...]`}
        />
        <h2 id="validate">Validate Postcodes</h2>
        <CodeBlock
          language="typescript"
          code={`import { validatePostCode } from 'bd-geo-info';

validatePostCode('1207'); // true
validatePostCode('abc');  // false`}
        />
      </article>
    ),
    requirements: (
      <article className="prose-custom">
        <h1>Requirements</h1>
        <p className="lead">bd-geo-info has minimal requirements and runs in virtually every JavaScript environment.</p>
        <h2 id="runtime">Runtime Requirements</h2>
        <ul>
          <li><strong>Node.js</strong> ≥ 14 (for dynamic imports)</li>
          <li><strong>Browser</strong>: Any modern browser with ES2017+ support</li>
          <li><strong>Bun / Deno</strong>: Supported</li>
        </ul>
        <h2 id="peer">Peer Dependencies</h2>
        <p>React and react-dom are <em>optional</em> peer dependencies — only needed for the <code>/react</code> subpath:</p>
        <CodeBlock code={`"peerDependencies": {\n  "react": ">=16.8.0",\n  "react-dom": ">=16.8.0"\n}`} language="json" />
      </article>
    ),
    'geographic-hierarchy': (
      <article className="prose-custom">
        <h1>Geographic Hierarchy</h1>
        <p className="lead">Bangladesh is divided into a 4-level administrative hierarchy.</p>
        <div className="my-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-sm">
          Division → District → Upazila / Thana → Union
        </div>
        <ul>
          <li><strong>Division (বিভাগ)</strong> — top level, 8 total</li>
          <li><strong>District (জেলা)</strong> — 64 total, each belongs to a division</li>
          <li><strong>Upazila / Thana (উপজেলা/থানা)</strong> — 610 total (incl. 107 metro thanas)</li>
          <li><strong>Union (ইউনিয়ন)</strong> — 4,540 total; metro thanas have no unions</li>
        </ul>
      </article>
    ),
    'location-ids': (
      <article className="prose-custom">
        <h1>Location IDs</h1>
        <p className="lead">Every location entity has a unique numeric string ID assigned by the Bangladesh Bureau of Statistics (BBS).</p>
        <CodeBlock language="typescript" code={`// ID examples
const divisionId = '3';    // Dhaka Division
const districtId = '47';   // Dhaka District
const upazilaId  = '530';  // Mirpur Thana
const unionId    = '3272'; // Birulia Union`} />
        <p>IDs are passed as strings to all API functions to maintain compatibility with BBS source data.</p>
      </article>
    ),
    'data-structure': (
      <article className="prose-custom">
        <h1>Data Structure</h1>
        <p className="lead">All API functions return typed objects with consistent shapes.</p>
        <CodeBlock language="typescript" code={`// SelectOption (returned by getDivisions, getDistricts, etc.)
{ value: string; label: string }

// Division (raw type)
{ id: string; name: string; bn_name: string; lat: string; long: string; url?: string }

// District (raw type)
{ id: string; division_id: string; name: string; bn_name: string; lat: string; long: string }

// Upazila
{ id: string; district_id: string; name: string; bn_name: string; url?: string }

// UnionData
{ id: string; upazilla_id: string; name: string; bn_name: string; url: string }

// PostCode
{ division_id: string; district_id?: string; district?: string; upazila: string; postOffice: string; postCode: string }`} />
      </article>
    ),
    'api/divisions': (
      <article className="prose-custom">
        <h1>getDivisions</h1>
        <p className="lead">Returns all 8 Bangladesh divisions as selectable options.</p>
        <h2 id="signature">Signature</h2>
        <CodeBlock language="typescript" code={`getDivisions(language?: 'en' | 'bn'): Promise<{ value: string; label: string }[]>`} />
        <h2 id="parameters">Parameters</h2>
        <table className="w-full text-sm border-collapse">
          <thead><tr className="border-b border-slate-200 dark:border-slate-700"><th className="text-left py-2 pr-4">Param</th><th className="text-left py-2 pr-4">Type</th><th className="text-left py-2">Default</th></tr></thead>
          <tbody><tr><td className="py-2 pr-4 font-mono text-indigo-600 dark:text-indigo-400">language</td><td className="py-2 pr-4 font-mono text-slate-500">&apos;en&apos; | &apos;bn&apos;</td><td className="py-2 text-slate-500">&apos;en&apos;</td></tr></tbody>
        </table>
        <h2 id="example">Example</h2>
        <CodeBlock language="typescript" code={`const divisions = await getDivisions('en');
// [
//   { value: '1', label: 'Barisal' },
//   { value: '2', label: 'Chattagram' },
//   { value: '3', label: 'Dhaka' },
//   ...8 items
// ]`} />
      </article>
    ),
    'api/districts': (
      <article className="prose-custom">
        <h1>getDistricts</h1>
        <p className="lead">Returns all districts belonging to a given division.</p>
        <CodeBlock language="typescript" code={`getDistricts(divisionId: string, language?: 'en' | 'bn'): Promise<{ value: string; label: string }[]>`} />
        <h2 id="example">Example</h2>
        <CodeBlock language="typescript" code={`const districts = await getDistricts('3', 'en');
// Districts in Dhaka division
// [{ value: '47', label: 'Dhaka' }, { value: '41', label: 'Gazipur' }, ...]`} />
      </article>
    ),
    'api/upazilas': (
      <article className="prose-custom">
        <h1>getUpazilas</h1>
        <p className="lead">Returns all upazilas / thanas for a given district.</p>
        <CodeBlock language="typescript" code={`getUpazilas(districtId: string, language?: 'en' | 'bn'): Promise<{
  id: string; district_id: string; name: string; bn_name: string;
  value: string; label: string; url?: string;
}[]>`} />
        <h2 id="example">Example</h2>
        <CodeBlock language="typescript" code={`const upazilas = await getUpazilas('47', 'en');
// Upazilas in Dhaka district
// [{ id: '530', value: '530', label: 'Mirpur', district_id: '47', ... }]`} />
      </article>
    ),
    'api/unions': (
      <article className="prose-custom">
        <h1>getUnions</h1>
        <p className="lead">Returns unions for a given upazila. Metropolitan thanas return an empty array.</p>
        <CodeBlock language="typescript" code={`getUnions(upazilaId: string, language?: 'en' | 'bn'): Promise<{ value: string; label: string; url?: string }[]>`} />
        <h2 id="example">Example</h2>
        <CodeBlock language="typescript" code={`const unions = await getUnions('365', 'en');
// [{ value: '3272', label: 'Birulia', url: '...' }, ...]`} />
      </article>
    ),
    'api/postcodes': (
      <article className="prose-custom">
        <h1>getPostCodes</h1>
        <p className="lead">Returns postcodes for a district, optionally filtered by upazila name.</p>
        <CodeBlock language="typescript" code={`getPostCodes(districtId: string | null, upazila?: string): Promise<PostCode[]>`} />
        <CodeBlock language="typescript" code={`const codes = await getPostCodes('47');
// [{ district_id: '47', upazila: 'Mirpur', postOffice: 'Mirpur-10', postCode: '1216', ... }]`} />
      </article>
    ),
    'api/search': (
      <article className="prose-custom">
        <h1>searchLocations</h1>
        <p className="lead">Search all Bangladesh divisions, districts, upazilas, unions and post offices by English name, বাংলা name, alias or ID.</p>
        <CodeBlock language="typescript" code={`import { searchLocations } from 'bd-geo-info';

const results = searchLocations({ query: 'Barishal', limit: 10 });
// [{ type: 'division', name: 'Barisal', ... }]`} />
        <p>Use <code>types</code>, <code>divisionId</code>, <code>districtId</code> and <code>limit</code> to narrow results.</p>
      </article>
    ),
    'api/find-location': (
      <article className="prose-custom">
        <h1>findLocation</h1>
        <p className="lead">Return the best single match for a location name or ID.</p>
        <CodeBlock language="typescript" code={`import { findLocation } from 'bd-geo-info';
const barishal = findLocation('বরিশাল', ['division']);
const dhaka = findLocation('47', ['district']);`} />
      </article>
    ),
    'api/validate-address': (
      <article className="prose-custom">
        <h1>validateAddress</h1>
        <p className="lead">Validate submitted location names and postcode format before saving an address.</p>
        <CodeBlock language="typescript" code={`import { validateAddress } from 'bd-geo-info';
const result = validateAddress({ division: 'Barisal', district: 'Pirojpur', postCode: '8500' });
if (!result.valid) console.log(result.errors);`} />
      </article>
    ),
    'api/geo': (
      <article className="prose-custom">
        <h1>Coordinate utilities</h1>
        <p className="lead">Calculate distance in kilometres or find the nearest division/district from coordinates.</p>
        <CodeBlock language="typescript" code={`import { distanceBetween, findNearestLocation } from 'bd-geo-info';
const km = distanceBetween({ latitude: 23.81, longitude: 90.41 }, { latitude: 22.70, longitude: 90.35 });
const nearest = findNearestLocation({ latitude: 23.81, longitude: 90.41 });`} />
      </article>
    ),
    'api/format-address': (
      <article className="prose-custom">
        <h1>formatAddress</h1>
        <p className="lead">Formats a complete address string from component IDs.</p>
        <CodeBlock language="typescript" code={`formatAddress(
  division: string,
  district: string,
  upazila: string,
  union: string,
  postCode: string,
  street: string,
  language?: 'en' | 'bn'
): Promise<string>`} />
        <CodeBlock language="typescript" code={`const address = await formatAddress('3', '47', '530', '3272', '1216', '12/A Road 5', 'en');
// "12/A Road 5, Birulia, Mirpur, Dhaka-1216, Dhaka"`} />
      </article>
    ),
    'api/validate-postcode': (
      <article className="prose-custom">
        <h1>validatePostCode</h1>
        <p className="lead">Validates that a string is a valid Bangladesh postcode (4 digits).</p>
        <CodeBlock language="typescript" code={`validatePostCode(postCode: string): boolean`} />
        <CodeBlock language="typescript" code={`validatePostCode('1207'); // true
validatePostCode('12');   // false — too short
validatePostCode('abcd'); // false — not digits`} />
      </article>
    ),
    'react/address-form': (
      <article className="prose-custom">
        <h1>AddressForm</h1>
        <p className="lead">A complete address form component with cascading selects.</p>
        <CodeBlock language="tsx" code={`import { AddressForm } from 'bd-geo-info/react';

<AddressForm
  language="en"
  onSubmit={(data) => console.log(data)}
/>`} />
      </article>
    ),
    'react/division-select': (
      <article className="prose-custom">
        <h1>DivisionSelect</h1>
        <CodeBlock language="tsx" code={`import { DivisionSelect } from 'bd-geo-info/react';

<DivisionSelect
  value={division}
  onChange={(val) => setDivision(val)}
  language="en"
/>`} />
      </article>
    ),
    'react/district-select': (
      <article className="prose-custom">
        <h1>DistrictSelect</h1>
        <CodeBlock language="tsx" code={`import { DistrictSelect } from 'bd-geo-info/react';

<DistrictSelect
  divisionId={divisionId}
  value={district}
  onChange={(val) => setDistrict(val)}
  language="en"
/>`} />
      </article>
    ),
    'react/upazila-select': (
      <article className="prose-custom">
        <h1>UpazilaSelect</h1>
        <CodeBlock language="tsx" code={`import { UpazilaSelect } from 'bd-geo-info/react';

<UpazilaSelect
  districtId={districtId}
  value={upazila}
  onChange={(val) => setUpazila(val)}
  language="en"
/>`} />
      </article>
    ),
    'react/union-select': (
      <article className="prose-custom">
        <h1>UnionSelect</h1>
        <CodeBlock language="tsx" code={`import { UnionSelect } from 'bd-geo-info/react';

<UnionSelect
  upazilaId={upazilaId}
  value={union}
  onChange={(val) => setUnion(val)}
  language="en"
/>`} />
      </article>
    ),
    'react/location-search': (
      <article className="prose-custom">
        <h1>LocationSearch</h1>
        <p className="lead">Add an accessible all-Bangladesh location search box to a React application.</p>
        <CodeBlock language="tsx" code={`import { LocationSearch } from 'bd-geo-info/react';

<LocationSearch
  types={['division', 'district', 'postcode']}
  language="bn"
  onChange={(location) => console.log(location)}
/>`} />
      </article>
    ),
    'examples/basic-form': (
      <article className="prose-custom">
        <h1>Basic Address Form</h1>
        <CodeBlock language="tsx" filename="BasicForm.tsx" code={`'use client';
import { useState, useEffect } from 'react';
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';

export function BasicForm() {
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState('');
  
  useEffect(() => { getDivisions('en').then(setDivisions); }, []);
  
  return (
    <select value={division} onChange={(e) => setDivision(e.target.value)}>
      <option value="">Select Division</option>
      {divisions.map((d) => (
        <option key={d.value} value={d.value}>{d.label}</option>
      ))}
    </select>
  );
}`} />
      </article>
    ),
    'examples/cascading': (
      <article className="prose-custom">
        <h1>Cascading Dropdowns</h1>
        <p>See the full working example in the <Link href="/playground" className="text-indigo-600 hover:underline">Playground</Link>.</p>
        <CodeBlock language="tsx" code={`// Division → District → Upazila → Union
// Each dropdown resets and fetches when parent changes

useEffect(() => {
  if (!division) return;
  getDistricts(division, 'en').then(setDistricts);
  setDistrict('');
}, [division]);`} />
      </article>
    ),
    'examples/bangla': (
      <article className="prose-custom">
        <h1>Bangla Form</h1>
        <CodeBlock language="tsx" code={`const divisions = await getDivisions('bn');
// [{ value: '1', label: 'বরিশাল' }, { value: '3', label: 'ঢাকা' }, ...]

const districts = await getDistricts('3', 'bn');
// [{ value: '47', label: 'ঢাকা' }, ...]`} />
      </article>
    ),
    'advanced/performance': (
      <article className="prose-custom">
        <h1>Performance</h1>
        <p>All data files are loaded via dynamic imports, so they are code-split automatically. Only the data you request is downloaded.</p>
        <CodeBlock language="typescript" code={`// Each call lazily imports only the needed JSON chunk:
const divisions = await getDivisions(); // imports bd-divisions.json
const districts = await getDistricts('3'); // imports bd-districts.json`} />
      </article>
    ),
    'advanced/error-handling': (
      <article className="prose-custom">
        <h1>Error Handling</h1>
        <CodeBlock language="typescript" code={`try {
  const districts = await getDistricts(divisionId, 'en');
} catch (err) {
  console.error('Failed to load districts', err);
}

// getUnions returns [] for metro thanas — check length:
const unions = await getUnions(upazilaId);
if (unions.length === 0) {
  // Metropolitan thana — no union list
}`} />
      </article>
    ),
    'advanced/custom-styling': (
      <article className="prose-custom">
        <h1>Custom Styling</h1>
        <p>React components accept a <code>theme</code> prop for basic customization:</p>
        <CodeBlock language="tsx" code={`<AddressForm
  theme={{
    colors: {
      primary: '#6366f1',
      background: '#ffffff',
      border: '#e2e8f0',
    },
    borderRadius: '8px',
    fontSize: { input: '14px' },
  }}
/>`} />
      </article>
    ),
  };

  return contents[key] || null;
}

export default function DocSlugPage({ params }: Props) {
  const doc = findDocBySlug(params.slug);
  if (!doc) notFound();

  const content = getDocContent(params.slug);
  if (!content) notFound();

  const { prev, next } = getAdjacentDocs(doc.href);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-10">
        <DocsSidebar />
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <Link href="/docs" className="hover:text-slate-900 dark:hover:text-white">Docs</Link>
            {params.slug.slice(0, -1).map((part) => (
              <>
                <span key={part + '-sep'}>/</span>
                <span key={part} className="capitalize">{part.replace(/-/g, ' ')}</span>
              </>
            ))}
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium">{doc.title}</span>
          </div>

          {/* Content */}
          <div className="doc-content">
            {content}
          </div>

          {/* Prev / Next */}
          <div className="flex justify-between mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
            {prev ? (
              <Link href={prev.href} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span>{prev.title}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={next.href} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <span>{next.title}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
