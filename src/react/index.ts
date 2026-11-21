// React components
export { default as AddressForm } from '../components/AddressForm.js';
export { default as DivisionSelect } from '../components/DivisionSelect.js';
export { default as DistrictSelect } from '../components/DistrictSelect.js';
export { default as UpazilaSelect } from '../components/UpazilaSelect.js';
export { default as UnionSelect } from '../components/UnionSelect.js';
export { default as LocationSearch } from '../components/LocationSearch.js';
export { useLocationSearch } from './useLocationSearch.js';

// React-specific types
export type {
  AddressFormProps,
  AddressFormErrors,
  AddressFormLabels,
  SelectProps,
  PostOfficeSelectProps,
} from '../types/react.js';
export type { LocationSearchProps } from '../components/LocationSearch.js';

// Re-export core types and utils for convenience
export * from '../types/index.js';
export * from '../utils/index.js';
export { getDistricts } from '../utils/getDistricts.js';
export { default as getUpazilas } from '../utils/getUpazilas.js';
export { getUnions } from '../utils/getUnions.js';
export { default as getPostCode } from '../utils/getPostCode.js';
