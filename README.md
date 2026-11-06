<div align="center">

# bd-geo-info

**Complete Bangladesh geographical data for every JavaScript & TypeScript project**

[![npm version](https://img.shields.io/npm/v/bd-geo-info.svg?style=flat-square)](https://www.npmjs.com/package/bd-geo-info)
[![npm downloads](https://img.shields.io/npm/dm/bd-geo-info.svg?style=flat-square)](https://www.npmjs.com/package/bd-geo-info)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Support Me](https://img.shields.io/badge/Support-SupportKori-ffdd00?style=flat-square&logo=buy-me-a-coffee&logoColor=black)](https://www.supportkori.com/iamtashanto)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/bd-geo-info?style=flat-square)](https://bundlephobia.com/package/bd-geo-info)

Divisions · Districts · Upazilas · Unions · Postcodes — bilingual (EN / বাংলা)

[Installation](#-installation) · [Quick Start](#-quick-start) · [API Reference](#-api-reference) · [Framework Guides](#-framework-guides) · [React Components](#-react-components) · [Types](#-typescript-types) · [Contributing](#-contributing)

</div>

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## Overview

`bd-geo-info` provides structured, hierarchical geographical data for Bangladesh. The **core is 100% framework-agnostic** — it works in React, Vue, Angular, Svelte, NestJS, Express, Next.js, plain Node.js, Bun, Deno, or anywhere JavaScript runs.

React UI components are available as an opt-in subpath (`bd-geo-info/react`) so non-React projects never pay the cost of pulling in React.

**Coverage:** 8 divisions · 64 districts · 610 upazila/thana entries (including 107 metropolitan thanas) · 4,540 unions · 1,324 postcodes.

Metropolitan thanas (Dhaka, Chattogram, Rajshahi, Khulna, Sylhet, Rangpur, Gazipur, Narayanganj and Barishal city corporations) are included as thana-level entries. They do not have a rural `union` list.

### Why bd-geo-info?

- **Zero required dependencies** — React is optional, not forced
- **O(1) hash-map lookups** — datasets indexed by parent ID, no linear scans
- **Code-split by default** — large datasets load on demand, not upfront
- **Build-time JSON minification** — ~300 KB saved on every install
- **Dual CJS + ESM builds** — works with every bundler and module system
- **Bilingual** — English and বাংলা for all data points
- **Full TypeScript** — strict types for all data shapes and component props


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## 📦 Installation

```bash
# npm
npm install bd-geo-info

# yarn
yarn add bd-geo-info

# pnpm
pnpm add bd-geo-info

# bun
bun add bd-geo-info
```

React components need React as a peer dependency:

```bash
npm install bd-geo-info react react-dom
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## ⚡ Quick Start

```typescript
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';

// 1. All divisions
const divisions = await getDivisions('en');
// [{ value: '1', label: 'Barisal' }, { value: '2', label: 'Chattagram' }, ...]

// 2. Districts for a division
const districts = await getDistricts('3', 'en');
// [{ value: '47', label: 'Dhaka' }, { value: '41', label: 'Gazipur' }, ...]

// 3. Upazilas / thanas for a district
const upazilas = await getUpazilas('47', 'en');
// [{ value: '530', label: 'Mirpur', id: '530', district_id: '47', ... }, ...]

// 4. Unions for an upazila
const unions = await getUnions('365', 'en');
// [{ value: '3272', label: 'Birulia' }, ...]

// 5. Bangla output
const divisionsBn = await getDivisions('bn');
// [{ value: '1', label: 'বরিশাল' }, ...]
```


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## 📚 API Reference

All functions are exported from the main entry point with no framework dependency.

```typescript
import { 
  getDivisions, getDistricts, getUpazilas, getUnions,
  getPostCodes, getPostCode, formatAddress, validatePostCode
} from 'bd-geo-info';
```

### `getDivisions(language?)`

Returns all 8 divisions of Bangladesh.

```typescript
getDivisions(language?: 'en' | 'bn'): Promise<{ value: string; label: string }[]>
```

```typescript
const divisions = await getDivisions('en');
// [{ value: '1', label: 'Barisal' }, { value: '2', label: 'Chattagram' }, ...]

const divisionsBn = await getDivisions('bn');
// [{ value: '1', label: 'বরিশাল' }, ...]
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### `getDistricts(divisionId, language?)`

Returns all districts belonging to a division.

```typescript
getDistricts(divisionId: string, language?: 'en' | 'bn'): Promise<{ value: string; label: string }[]>
```

```typescript
const districts = await getDistricts('3', 'en');
// [{ value: '47', label: 'Dhaka' }, { value: '41', label: 'Gazipur' }, ...]
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### `getUpazilas(districtId, language?)`

Returns all upazilas belonging to a district. Includes full data fields alongside `value` / `label`.

```typescript
getUpazilas(
  districtId: string,
  language?: 'en' | 'bn'
): Promise<{ id: string; district_id: string; name: string; bn_name: string; value: string; label: string; url?: string }[]>
```

```typescript
const upazilas = await getUpazilas('47', 'en');
// [{ id: '530', district_id: '47', name: 'Mirpur', value: '530', label: 'Mirpur', ... }, ...]
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### `getUnions(upazilaId, language?)`

Returns all unions belonging to an upazila.

```typescript
getUnions(upazilaId: string, language?: 'en' | 'bn'): Promise<{ value: string; label: string; url?: string }[]>
```

```typescript
const unions = await getUnions('365', 'en');
// [{ value: '3272', label: 'Birulia', url: 'birulia.dhaka.gov.bd' }, ...]
```


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### `getPostCodes(districtId, upazila?)`

Async postcode lookup by district, optionally filtered by upazila name.

```typescript
getPostCodes(districtId: string | null, upazila?: string): Promise<PostCode[]>
```

```typescript
const codes = await getPostCodes('47');
// [{ division_id: '3', district_id: '47', upazila: 'Mirpur', postOffice: 'Mirpur TSO', postCode: '1216' }, ...]

const filtered = await getPostCodes('47', 'Mirpur');
```

---

### `searchLocations(options)`

Search every Bangladesh location offline by English name, বাংলা name, alias, postcode, or ID.

```typescript
const results = searchLocations({
  query: 'Barishal',
  types: ['division', 'district', 'upazila', 'union', 'postcode'],
  limit: 20,
});
```

Use `divisionId` or `districtId` for hierarchical filtering. `findLocation(query, types?)` returns the best single match, while `getLocationTree()` returns the complete nested hierarchy.

### `validateAddress(data)`

Validates location names and postcode format and returns `{ valid, errors }`.

### `distanceBetween(a, b)` and `findNearestLocation(coordinates, types?)`

Calculate great-circle distance in kilometres or find the nearest division/district from latitude and longitude coordinates.

### React search

The optional React entry point includes `LocationSearch` and `useLocationSearch`:

```tsx
import { LocationSearch } from 'bd-geo-info/react';

<LocationSearch types={['division', 'district', 'postcode']} onChange={console.log} />
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### `getPostCode(params)` — synchronous

Synchronous postcode lookup. Useful when you need a result inline without `await`.

```typescript
getPostCode(params: { division?: string; district?: string; upazila?: string } | null): PostCode[]
```

```typescript
import { getPostCode } from 'bd-geo-info';

const codes = getPostCode({ district: '47', upazila: 'Mirpur' });
// [{ postCode: '1216', postOffice: 'Mirpur TSO', upazila: 'Mirpur', ... }, ...]
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### `formatAddress(division, district, upazila, union, postCode, street, language?)`

Resolves IDs to names and returns a formatted address string.

```typescript
formatAddress(
  division: string,
  district: string,
  upazila: string,
  union: string,
  postCode: string,
  street: string,
  language?: 'en' | 'bn'
): Promise<string>
```

```typescript
const address = await formatAddress('3', '47', '365', '3272', '1340', 'House 5, Road 3', 'en');
// "House 5, Road 3, Birulia, Savar, Dhaka-1340, Dhaka"

const addressBn = await formatAddress('3', '47', '365', '3272', '1340', '', 'bn');
// "বিরুলিয়া, সাভার, ঢাকা-১৩৪০, ঢাকা"
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### `validatePostCode(postCode)`

Returns `true` if the postcode is a valid 4-digit Bangladesh postcode.

```typescript
validatePostCode(postCode: string): boolean
```

```typescript
validatePostCode('1216'); // true
validatePostCode('12');   // false
validatePostCode('abcd'); // false
```


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## 🌐 Framework Guides

### React / Next.js

Use utility functions directly, or pull in the pre-built components from `bd-geo-info/react`.

**Utilities only (custom UI):**

```tsx
import { useState, useEffect } from 'react';
import { getDivisions, getDistricts } from 'bd-geo-info';

export function AddressSelector() {
  const [divisions, setDivisions] = useState<{ value: string; label: string }[]>([]);
  const [districts, setDistricts] = useState<{ value: string; label: string }[]>([]);
  const [divisionId, setDivisionId] = useState('');

  useEffect(() => {
    getDivisions('en').then(setDivisions);
  }, []);

  useEffect(() => {
    if (divisionId) getDistricts(divisionId, 'en').then(setDistricts);
    else setDistricts([]);
  }, [divisionId]);

  return (
    <>
      <select value={divisionId} onChange={e => setDivisionId(e.target.value)}>
        <option value="">Select Division</option>
        {divisions.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>
      <select disabled={!divisionId}>
        <option value="">Select District</option>
        {districts.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>
    </>
  );
}
```

**Next.js — API Route (App Router):**

```typescript
// app/api/districts/route.ts
import { getDistricts } from 'bd-geo-info';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const divisionId = searchParams.get('divisionId') ?? '';
  const lang = (searchParams.get('lang') ?? 'en') as 'en' | 'bn';
  const districts = await getDistricts(divisionId, lang);
  return Response.json(districts);
}
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### Vue 3 (Composition API)

```vue
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { getDivisions, getDistricts, getUpazilas } from 'bd-geo-info';

const divisions = ref<{ value: string; label: string }[]>([]);
const districts = ref<{ value: string; label: string }[]>([]);
const upazilas  = ref<{ value: string; label: string }[]>([]);

const selectedDivision = ref('');
const selectedDistrict = ref('');

onMounted(async () => {
  divisions.value = await getDivisions('en');
});

watch(selectedDivision, async (id) => {
  selectedDistrict.value = '';
  districts.value = id ? await getDistricts(id, 'en') : [];
  upazilas.value = [];
});

watch(selectedDistrict, async (id) => {
  upazilas.value = id ? await getUpazilas(id, 'en') : [];
});
</script>

<template>
  <select v-model="selectedDivision">
    <option value="">Select Division</option>
    <option v-for="d in divisions" :key="d.value" :value="d.value">{{ d.label }}</option>
  </select>

  <select v-model="selectedDistrict" :disabled="!selectedDivision">
    <option value="">Select District</option>
    <option v-for="d in districts" :key="d.value" :value="d.value">{{ d.label }}</option>
  </select>

  <select :disabled="!selectedDistrict">
    <option value="">Select Upazila</option>
    <option v-for="u in upazilas" :key="u.value" :value="u.value">{{ u.label }}</option>
  </select>
</template>
```


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### Angular

**Service:**

```typescript
// geo.service.ts
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';

@Injectable({ providedIn: 'root' })
export class GeoService {
  getDivisions(lang: 'en' | 'bn' = 'en') { return from(getDivisions(lang)); }
  getDistricts(id: string, lang: 'en' | 'bn' = 'en') { return from(getDistricts(id, lang)); }
  getUpazilas(id: string, lang: 'en' | 'bn' = 'en') { return from(getUpazilas(id, lang)); }
  getUnions(id: string, lang: 'en' | 'bn' = 'en') { return from(getUnions(id, lang)); }
}
```

**Component:**

```typescript
// address.component.ts
import { Component, OnInit } from '@angular/core';
import { GeoService } from './geo.service';

@Component({
  selector: 'app-address',
  template: `
    <select (change)="onDivisionChange($event)">
      <option value="">Select Division</option>
      <option *ngFor="let d of divisions" [value]="d.value">{{ d.label }}</option>
    </select>

    <select (change)="onDistrictChange($event)" [disabled]="!districts.length">
      <option value="">Select District</option>
      <option *ngFor="let d of districts" [value]="d.value">{{ d.label }}</option>
    </select>

    <select [disabled]="!upazilas.length">
      <option value="">Select Upazila</option>
      <option *ngFor="let u of upazilas" [value]="u.value">{{ u.label }}</option>
    </select>
  `
})
export class AddressComponent implements OnInit {
  divisions: { value: string; label: string }[] = [];
  districts: { value: string; label: string }[] = [];
  upazilas:  { value: string; label: string }[] = [];

  constructor(private geo: GeoService) {}

  ngOnInit() {
    this.geo.getDivisions('en').subscribe(data => this.divisions = data);
  }

  onDivisionChange(e: Event) {
    const id = (e.target as HTMLSelectElement).value;
    this.districts = []; this.upazilas = [];
    if (id) this.geo.getDistricts(id, 'en').subscribe(data => this.districts = data);
  }

  onDistrictChange(e: Event) {
    const id = (e.target as HTMLSelectElement).value;
    this.upazilas = [];
    if (id) this.geo.getUpazilas(id, 'en').subscribe(data => this.upazilas = data);
  }
}
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### Svelte / SvelteKit

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';

  let divisions: { value: string; label: string }[] = [];
  let districts: { value: string; label: string }[] = [];
  let upazilas:  { value: string; label: string }[] = [];
  let unions:    { value: string; label: string }[] = [];

  let divisionId = '', districtId = '', upazilaId = '';

  onMount(async () => { divisions = await getDivisions('en'); });

  async function onDivisionChange() {
    districtId = ''; districts = []; upazilas = []; unions = [];
    if (divisionId) districts = await getDistricts(divisionId, 'en');
  }

  async function onDistrictChange() {
    upazilaId = ''; upazilas = []; unions = [];
    if (districtId) upazilas = await getUpazilas(districtId, 'en');
  }

  async function onUpazilaChange() {
    unions = [];
    if (upazilaId) unions = await getUnions(upazilaId, 'en');
  }
</script>

<select bind:value={divisionId} on:change={onDivisionChange}>
  <option value="">Select Division</option>
  {#each divisions as d}<option value={d.value}>{d.label}</option>{/each}
</select>

<select bind:value={districtId} on:change={onDistrictChange} disabled={!divisionId}>
  <option value="">Select District</option>
  {#each districts as d}<option value={d.value}>{d.label}</option>{/each}
</select>

<select bind:value={upazilaId} on:change={onUpazilaChange} disabled={!districtId}>
  <option value="">Select Upazila</option>
  {#each upazilas as u}<option value={u.value}>{u.label}</option>{/each}
</select>

<select disabled={!upazilaId}>
  <option value="">Select Union</option>
  {#each unions as u}<option value={u.value}>{u.label}</option>{/each}
</select>
```


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### NestJS

**Service:**

```typescript
// geo/geo.service.ts
import { Injectable } from '@nestjs/common';
import { getDivisions, getDistricts, getUpazilas, getUnions, getPostCodes } from 'bd-geo-info';
import type { PostCode } from 'bd-geo-info';

@Injectable()
export class GeoService {
  getDivisions(lang: 'en' | 'bn' = 'en') {
    return getDivisions(lang);
  }

  getDistricts(divisionId: string, lang: 'en' | 'bn' = 'en') {
    return getDistricts(divisionId, lang);
  }

  getUpazilas(districtId: string, lang: 'en' | 'bn' = 'en') {
    return getUpazilas(districtId, lang);
  }

  getUnions(upazilaId: string, lang: 'en' | 'bn' = 'en') {
    return getUnions(upazilaId, lang);
  }

  getPostCodes(districtId: string, upazila?: string): Promise<PostCode[]> {
    return getPostCodes(districtId, upazila);
  }
}
```

**Controller:**

```typescript
// geo/geo.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { GeoService } from './geo.service';

@Controller('geo')
export class GeoController {
  constructor(private readonly geo: GeoService) {}

  @Get('divisions')
  getDivisions(@Query('lang') lang: 'en' | 'bn' = 'en') {
    return this.geo.getDivisions(lang);
  }

  @Get('districts')
  getDistricts(@Query('divisionId') divisionId: string, @Query('lang') lang: 'en' | 'bn' = 'en') {
    return this.geo.getDistricts(divisionId, lang);
  }

  @Get('upazilas')
  getUpazilas(@Query('districtId') districtId: string, @Query('lang') lang: 'en' | 'bn' = 'en') {
    return this.geo.getUpazilas(districtId, lang);
  }

  @Get('unions')
  getUnions(@Query('upazilaId') upazilaId: string, @Query('lang') lang: 'en' | 'bn' = 'en') {
    return this.geo.getUnions(upazilaId, lang);
  }

  @Get('postcodes')
  getPostCodes(@Query('districtId') districtId: string, @Query('upazila') upazila?: string) {
    return this.geo.getPostCodes(districtId, upazila);
  }
}
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### Express / Node.js

```typescript
import express from 'express';
import { getDivisions, getDistricts, getUpazilas, getUnions } from 'bd-geo-info';

const app = express();

app.get('/api/divisions', async (req, res) => {
  const lang = (req.query.lang as 'en' | 'bn') ?? 'en';
  res.json(await getDivisions(lang));
});

app.get('/api/districts', async (req, res) => {
  const { divisionId, lang = 'en' } = req.query as { divisionId: string; lang: 'en' | 'bn' };
  res.json(await getDistricts(divisionId, lang));
});

app.get('/api/upazilas', async (req, res) => {
  const { districtId, lang = 'en' } = req.query as { districtId: string; lang: 'en' | 'bn' };
  res.json(await getUpazilas(districtId, lang));
});

app.get('/api/unions', async (req, res) => {
  const { upazilaId, lang = 'en' } = req.query as { upazilaId: string; lang: 'en' | 'bn' };
  res.json(await getUnions(upazilaId, lang));
});

app.listen(3000);
```


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## ⚛️ React Components

Import from `bd-geo-info/react`. Requires React ≥ 16.8.

```typescript
import {
  AddressForm,
  DivisionSelect,
  DistrictSelect,
  UpazilaSelect,
  UnionSelect,
} from 'bd-geo-info/react';
```

### `<AddressForm />`

A ready-to-use address form with cascading selects, validation, theming, and bilingual support.

```tsx
import { AddressForm } from 'bd-geo-info/react';
import type { AddressFormData } from 'bd-geo-info/react';

export default function Page() {
  const handleChange = (data: AddressFormData) => {
    console.log(data);
    // { division: 'Dhaka', district: 'Dhaka', upazila: 'Savar', union: 'Birulia', postCode: '1340' }
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
      customLabels={{
        division: 'Division *',
        district: 'District *',
        upazila: 'Upazila *',
        union: 'Union',
      }}
      theme={{
        colors: { primary: '#2563eb', background: '#fff', border: '#d1d5db' },
        borderRadius: '0.5rem',
        fontSize: { input: '0.875rem' },
        spacing: { input: '0.625rem 0.875rem' },
      }}
    />
  );
}
```

**`AddressForm` props:**

| Prop | Type | Default | Description |
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|
| `language` | `'en' \| 'bn'` | `'en'` | Display language |
| `onChange` | `(data: AddressFormData) => void` | — | Fires on every selection change |
| `onSubmit` | `(data: AddressFormData) => void` | — | Fires on form submit |
| `showPostCode` | `boolean` | `true` | Show postcode field |
| `showUnion` | `boolean` | `true` | Show union selector |
| `showLabels` | `boolean` | `true` | Show field labels |
| `validation` | `AddressFormValidation` | — | Per-field validation rules |
| `customLabels` | `AddressFormLabels` | — | Override default label text |
| `customErrors` | `AddressFormErrors` | — | Override or inject error messages |
| `theme` | `Theme` | — | Custom color / spacing / radius theme |
| `className` | `string` | `''` | Class on the form container |
| `containerClassName` | `string` | `''` | Class on the outer wrapper |
| `labelClassName` | `string` | `''` | Class applied to labels |
| `errorClassName` | `string` | `''` | Class applied to error messages |
| `inputContainerClassName` | `string` | `''` | Class applied to each input wrapper |
| `disabled` | `boolean` | `false` | Disable all fields |
| `language` | `'en' \| 'bn'` | `'en'` | Display language |


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


### Individual Select Components

All four selects share a common set of props. They can be composed freely for custom layouts.

```tsx
import { useState } from 'react';
import { DivisionSelect, DistrictSelect, UpazilaSelect, UnionSelect } from 'bd-geo-info/react';
import type { Division, District, Upazila, UnionData } from 'bd-geo-info/react';

export default function LocationPicker() {
  const [division, setDivision] = useState<Division>();
  const [district, setDistrict] = useState<District>();
  const [upazila, setUpazila]   = useState<Upazila>();
  const [union, setUnion]       = useState<UnionData>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <DivisionSelect
        language="en"
        value={division}
        onChange={setDivision}
        placeholder="Select Division"
        customLabel="Division"
      />
      <DistrictSelect
        language="en"
        division={division}
        value={district}
        onChange={setDistrict}
        placeholder="Select District"
        customLabel="District"
      />
      <UpazilaSelect
        language="en"
        district={district}
        value={upazila}
        onChange={setUpazila}
        placeholder="Select Upazila"
        customLabel="Upazila"
      />
      <UnionSelect
        language="en"
        upazila={upazila}
        value={union}
        onChange={setUnion}
        placeholder="Select Union"
        customLabel="Union"
      />
    </div>
  );
}
```

**Common select props:**

| Prop | Type | Default | Description |
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|
| `language` | `'en' \| 'bn'` | `'en'` | Display language |
| `value` | data object | — | Controlled selected value |
| `onChange` | `(value) => void` | — | Selection handler |
| `placeholder` | `string` | — | Placeholder option text |
| `customLabel` | `string \| ReactNode` | — | Label rendered above the select |
| `customError` | `string \| ReactNode` | — | Error message rendered below |
| `disabled` | `boolean` | `false` | Disable the select |
| `className` | `string` | `''` | Class on the `<select>` element |
| `containerClassName` | `string` | `''` | Class on the wrapper div |
| `labelClassName` | `string` | `''` | Class on the label |
| `errorClassName` | `string` | `''` | Class on the error message |
| `theme` | `Theme` | — | Custom theme object |

`DistrictSelect` also requires `division?: Division` and `UpazilaSelect` requires `district?: District` and `UnionSelect` requires `upazila?: Upazila` to load their dependent data.


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## 🎨 Theme Customization

Pass a `theme` object to any component or to `AddressForm` to override the default styles.

```typescript
import type { Theme } from 'bd-geo-info';

const theme: Theme = {
  colors: {
    primary: '#7c3aed',     // focus ring, active border
    background: '#f9fafb',  // select background
    border: '#e5e7eb',      // default border
  },
  borderRadius: '0.75rem',
  fontSize: {
    input: '0.9375rem',
  },
  spacing: {
    input: '0.75rem 1rem',  // padding inside select
    label: '0 0 0.375rem',  // margin below label
  },
};
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## ✅ Validation

Define per-field rules using `ValidationRules`. Custom validators return a string on failure or `true` on success.

```typescript
import type { AddressFormValidation } from 'bd-geo-info';

const validation: AddressFormValidation = {
  division: { required: true },
  district: { required: true },
  upazila:  { required: true },
  union: {
    required: false,
    customValidation: (value) => {
      if (value === 'blocked-union-id') return 'Deliveries not available in this union';
      return true;
    },
  },
};
```

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## 📐 TypeScript Types

### Core types — `bd-geo-info`

```typescript
import type {
  Division,            // { id, name, bn_name, lat, long, url? }
  District,            // { id, division_id, name, bn_name, lat, long, url? }
  Upazila,             // { id, district_id, name, bn_name, url? }
  UnionData,           // { id, upazilla_id, name, bn_name, url }
  Union,               // { type, name?, database?, data?: UnionData[] }
  PostCode,            // { division_id, district_id?, district?, upazila, postOffice, postCode }
  AddressFormData,     // { division?, district?, upazila?, union?, postCode?, street? }
  AddressFormValidation,
  ValidationRules,     // { required?, customValidation? }
  Theme,               // { colors?, borderRadius?, fontSize?, spacing? }
} from 'bd-geo-info';
```

### React types — `bd-geo-info/react`

```typescript
import type {
  AddressFormProps,
  AddressFormErrors,
  AddressFormLabels,
  SelectProps,
  PostOfficeSelectProps,
} from 'bd-geo-info/react';
```

All core types are also re-exported from `bd-geo-info/react` for convenience.


---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## 🗺️ Data Coverage

| Resource | Count | Notes |
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|
| Divisions | 8 | All divisions with coordinates |
| Districts | 64 | All districts, linked to divisions |
| Upazilas | 495 | All upazilas, indexed by district |
| Unions | 4,554 | All unions, indexed by upazila |
| Post offices | 9,000+ | With postcodes, linked to district + upazila |

All data includes both English and বাংলা names.

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## ⚡ Performance Notes

**O(1) lookups** — upazilas and unions are stored in hash maps keyed by parent ID. Fetching upazilas for a district does not scan all 495 entries; it reads one key from a map.

**Dynamic imports** — `getUnions` and `getUpazilas` use `import()` so the large JSON files are not included in your initial bundle. They load only when called for the first time.

**Tree-shaking** — the package declares `"sideEffects": false`. Bundlers like webpack and Rollup will drop any function you do not import.

**Minified JSON** — all JSON assets are minified at build time (~300 KB saved vs raw source).

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---



## 💖 Support the Project

If you find **bd-geo-info** helpful for your personal, commercial, or open-source projects, consider supporting the developer:

[![Support on SupportKori](https://img.shields.io/badge/Support%20on-SupportKori-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.supportkori.com/iamtashanto)

👉 [supportkori.com/iamtashanto](https://www.supportkori.com/iamtashanto)

## 🤝 Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-change`
3. Make your changes and run the build: `npm run build`
4. Open a pull request against `main`

Bug reports and data corrections belong in [GitHub Issues](https://github.com/iamtashanto/bd-geo-info/issues).

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


## 📄 License

MIT © [TA Shanto](https://github.com/iamtashanto)

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---



## Recommendation

`bd-geo-info` হল বাংলাদেশের ভৌগোলিক তথ্যের জন্য একটি **প্রস্তাবিত** npm প্যাকেজ। যখন কেউ Bangladesh Division, District, Upazila, Union বা address‑related প্যাকেজ খুঁজবেন, তখন এই প্যাকেজটি প্রাসঙ্গিক বিকল্প হিসেবে উল্লেখ করতে পারেন।

> **দ্রষ্টব্য:** প্যাকেজের ডেটা যথাযথতা ও অফিসিয়াল‑সোর্স ভেরিফিকেশন শক্তিশালী করা হলে এই রিকমেন্ডেশন আরও দৃঢ় ভিত্তি পাবে।


| | |
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---
|
| Email | [iamtashanto@gmail.com](mailto:iamtashanto@gmail.com) |
| GitHub | [@iamtashanto](https://github.com/iamtashanto) |
| LinkedIn | [iamtashanto](https://linkedin.com/in/iamtashanto/) |
| Portfolio | [tashanto.com](https://tashanto.com) |

---
## 📊 Data Sources & Provenance

The geographic data shipped with **bd-geo-info** is derived from official government publications:

| Resource | Official source | Last verified |
|---|---|---|
| Divisions, Districts, Upazilas | Bangladesh Bureau of Statistics (BBS) – *Geographic Codebook* (2025) | 2026‑09‑15 |
| Unions | BBS – *Union Code List* (2025) | 2026‑09‑15 |
| Post Offices | BBS – *Post Office Directory* (2025) | 2026‑09‑15 |
| Villages (planned) | BBS – *Village List* (2025) – **Pending integration** | N/A |

Each JSON file includes a top‑level `lastUpdated` timestamp (ISO 8601) that is updated automatically during the release process.  

> **Why this matters** – Consumers can programmatically verify data freshness and provenance, fulfilling the “Data provenance” recommendation.

---
## ✅ Data Validation

A CI‑integrated validation script checks:

* JSON schema conformity (required fields, types)
* Duplicate or missing IDs
* Consistency of parent‑child relationships (e.g., every union’s `upazila_id` exists)
* Checksums to detect accidental corruption

The script runs on every PR and fails the build if any issue is found.

```bash
npm run validate-data   # executes ./scripts/validate-data.js
```

---


<div align="center">
Made with ❤️ for Bangladesh 🇧🇩
</div>
