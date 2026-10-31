export interface DocNavItem {
  title: string;
  href: string;
  description?: string;
}

export interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

export const docsNav: DocNavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction', description: 'What is bd-geo-info and why use it' },
      { title: 'Installation', href: '/docs/installation', description: 'Install via npm, yarn, pnpm, or bun' },
      { title: 'Quick Start', href: '/docs/quick-start', description: 'Get up and running in minutes' },
      { title: 'Requirements', href: '/docs/requirements', description: 'Node.js and peer dependency requirements' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Geographic Hierarchy', href: '/docs/geographic-hierarchy', description: 'Division → District → Upazila → Union' },
      { title: 'Location IDs', href: '/docs/location-ids', description: 'Understanding numeric location identifiers' },
      { title: 'Data Structure', href: '/docs/data-structure', description: 'Shape of the returned data objects' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'getDivisions', href: '/docs/api/divisions', description: 'Fetch all 8 divisions' },
      { title: 'getDistricts', href: '/docs/api/districts', description: 'Fetch districts for a division' },
      { title: 'getUpazilas', href: '/docs/api/upazilas', description: 'Fetch upazilas for a district' },
      { title: 'getUnions', href: '/docs/api/unions', description: 'Fetch unions for an upazila' },
      { title: 'getPostCodes', href: '/docs/api/postcodes', description: 'Fetch postcodes for a district' },
      { title: 'formatAddress', href: '/docs/api/format-address', description: 'Format a full address string' },
      { title: 'validatePostCode', href: '/docs/api/validate-postcode', description: 'Validate a Bangladesh postcode' },
    ],
  },
  {
    title: 'React Components',
    items: [
      { title: 'AddressForm', href: '/docs/react/address-form', description: 'Complete address form component' },
      { title: 'DivisionSelect', href: '/docs/react/division-select', description: 'Division dropdown select' },
      { title: 'DistrictSelect', href: '/docs/react/district-select', description: 'District dropdown select' },
      { title: 'UpazilaSelect', href: '/docs/react/upazila-select', description: 'Upazila dropdown select' },
      { title: 'UnionSelect', href: '/docs/react/union-select', description: 'Union dropdown select' },
    ],
  },
  {
    title: 'Examples',
    items: [
      { title: 'Basic Address Form', href: '/docs/examples/basic-form', description: 'Simple address form example' },
      { title: 'Cascading Dropdowns', href: '/docs/examples/cascading', description: 'Linked selects with state management' },
      { title: 'Bangla Form', href: '/docs/examples/bangla', description: 'Full Bangla language form' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { title: 'Performance', href: '/docs/advanced/performance', description: 'Code splitting and lazy loading' },
      { title: 'Error Handling', href: '/docs/advanced/error-handling', description: 'Graceful error handling patterns' },
      { title: 'Custom Styling', href: '/docs/advanced/custom-styling', description: 'Theme and style customization' },
    ],
  },
];

export function findDocBySlug(slug: string[]): DocNavItem | null {
  const path = '/docs/' + slug.join('/');
  for (const section of docsNav) {
    const item = section.items.find((i) => i.href === path);
    if (item) return item;
  }
  return null;
}

export function getAdjacentDocs(currentHref: string): {
  prev: DocNavItem | null;
  next: DocNavItem | null;
} {
  const allItems = docsNav.flatMap((s) => s.items);
  const idx = allItems.findIndex((i) => i.href === currentHref);
  return {
    prev: idx > 0 ? allItems[idx - 1] : null,
    next: idx < allItems.length - 1 ? allItems[idx + 1] : null,
  };
}

