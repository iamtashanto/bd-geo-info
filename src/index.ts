// Core utility functions (framework-agnostic)
export { getDivisions, getDistricts, getUpazilas, getUnions, getPostCodes, formatAddress, validatePostCode } from './utils/index.js';

// Individual util exports for backwards compatibility
export { getDistricts as getDistrictsList } from './utils/getDistricts.js';
export { default as getUpazilasList } from './utils/getUpazilas.js';
export { getUnions as getUnionsList, getUnionsList as getUnionsSync } from './utils/getUnions.js';
export { default as getPostCode } from './utils/getPostCode.js';
export { getPlaces } from './utils/getPlaces.js';
export {
  findLocation,
  findLocationAsync,
  getLocationTree,
  getLocationTreeAsync,
  normalizeLocationQuery,
  searchLocations,
  searchLocationsAsync,
  distanceBetween,
  distanceBetweenAsync,
  findNearestLocation,
  findNearestLocationAsync,
  validateAddress,
  validateAddressAsync,
} from './utils/index.js';

// Core types (no React dependency)
export type {
  Division,
  District,
  Upazila,
  UnionData,
  Union,
  PostCode,
  AddressFormData,
  AddressFormValidation,
  ValidationRules,
  Theme,
  AddressValidationResult,
  Coordinates,
  Place,
  PlaceKind,
  LocationSearchResult,
  LocationTree,
  LocationType,
  SearchLocationsOptions,
} from './types/index.js';
