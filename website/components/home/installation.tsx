import Link from 'next/link';
import { CodeBlock } from '@/components/docs/code-block';
import { ArrowRight } from 'lucide-react';

const quickStartCode = `import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';

// 1. Fetch all divisions (English)
const divisions = await getDivisions('en');
// [{ value: '1', label: 'Barisal' }, { value: '3', label: 'Dhaka' }, ...]

// 2. Districts for Dhaka division (id: '3')
const districts = await getDistricts('3', 'en');
// [{ value: '47', label: 'Dhaka' }, { value: '41', label: 'Gazipur' }, ...]

// 3. Upazilas for Dhaka district (id: '47')
const upazilas = await getUpazilas('47', 'en');

// 4. Unions for an upazila
const unions = await getUnions('365', 'en');

// 5. Bangla names
const divisionsBn = await getDivisions('bn');
// [{ value: '1', label: 'বরিশাল' }, ...]`;

const reactCode = `import { DivisionSelect, DistrictSelect, UpazilaSelect } from 'bd-geo-info/react';

function AddressForm() {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');

  return (
    <form>
      <DivisionSelect value={division} onChange={setDivision} language="en" />
      <DistrictSelect divisionId={division} value={district} onChange={setDistrict} />
      <UpazilaSelect districtId={district} language="en" />
    </form>
  );
}`;

export function Installation() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Up and Running in Minutes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Install via your favourite package manager and start using it immediately.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Install */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              1. Install
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'npm', cmd: 'npm install bd-geo-info' },
                { label: 'yarn', cmd: 'yarn add bd-geo-info' },
                { label: 'pnpm', cmd: 'pnpm add bd-geo-info' },
                { label: 'bun', cmd: 'bun add bd-geo-info' },
              ].map(({ label, cmd }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-lg border border-slate-700 font-mono text-sm text-slate-300"
                >
                  <span className="text-indigo-400 select-none text-xs w-8">{label}</span>
                  <span>{cmd}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Start */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              2. Quick Start
            </h3>
            <CodeBlock code={quickStartCode} language="typescript" filename="app.ts" />
          </div>

          {/* React Components */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              3. React Components (Optional)
            </h3>
            <CodeBlock code={reactCode} language="tsx" filename="AddressForm.tsx" />
          </div>

          <div className="flex justify-center">
            <Link href="/docs" className="btn-primary">
              Read the Full Docs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

