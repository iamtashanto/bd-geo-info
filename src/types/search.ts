import type { AddressFormData, District, Division, PostCode, UnionData, Upazila } from './index';

export type LocationType = 'division' | 'district' | 'upazila' | 'union' | 'postcode';

export interface LocationSearchResult {
  id: string;
  type: LocationType;
  name: string;
  bn_name: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  postCode?: string;
  postOffice?: string;
  latitude?: number;
  longitude?: number;
  path: string[];
}

export interface SearchLocationsOptions {
  query: string;
  types?: LocationType[];
  divisionId?: string;
  districtId?: string;
  limit?: number;
}

export interface LocationTree {
  divisions: Array<Division & { districts: Array<District & { upazilas: Array<Upazila & { unions: UnionData[] }> }> }>;
}

export interface AddressValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof AddressFormData, string>>;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
