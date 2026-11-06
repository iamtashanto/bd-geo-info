import divisionsData from '../data/bd-divisions.json';
import districtsData from '../data/bd-districts.json';
import type { AddressFormData } from '../types';
import type { AddressValidationResult, Coordinates, LocationSearchResult } from '../types/search';
import { findLocation } from './searchLocations';

export function validateAddress(data: AddressFormData): AddressValidationResult {
  const errors: AddressValidationResult['errors'] = {};
  const locations: Partial<Record<LocationSearchResult['type'], LocationSearchResult | undefined>> = {};
  const check = (field: keyof AddressFormData, type: LocationSearchResult['type']) => {
    const value = data[field];
    if (value) {
      locations[type] = findLocation(String(value), [type]);
      if (!locations[type]) errors[field] = `Unknown ${type}: ${value}`;
    }
  };
  check('division', 'division');
  check('district', 'district');
  check('upazila', 'upazila');
  check('union', 'union');
  if (data.postCode) {
    if (!/^\d{4}$/.test(data.postCode)) {
      errors.postCode = 'Postcode must contain exactly 4 digits';
    } else if (!findLocation(data.postCode, ['postcode'])) {
      errors.postCode = `Unknown postcode: ${data.postCode}`;
    }
  }
  const division = locations.division;
  const district = locations.district;
  const upazila = locations.upazila;
  const union = locations.union;
  if (division && district && district.divisionId !== division.id) errors.district = 'District does not belong to the selected division';
  if (district && upazila && upazila.districtId !== district.id) errors.upazila = 'Upazila does not belong to the selected district';
  if (upazila && union && union.upazilaId !== upazila.id) errors.union = 'Union does not belong to the selected upazila';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function distanceBetween(a: Coordinates, b: Coordinates): number {
  const earthRadiusKm = 6371;
  const latitudeDelta = ((b.latitude - a.latitude) * Math.PI) / 180;
  const longitudeDelta = ((b.longitude - a.longitude) * Math.PI) / 180;
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos((a.latitude * Math.PI) / 180) * Math.cos((b.latitude * Math.PI) / 180) * Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function findNearestLocation(coordinates: Coordinates, types: Array<'division' | 'district'> = ['division', 'district']): LocationSearchResult | undefined {
  const candidates: Array<LocationSearchResult & Coordinates> = types.flatMap((type) => {
    const source = type === 'division' ? divisionsData.divisions : districtsData.districts;
    return source.map((item) => ({
      id: item.id, type, name: item.name, bn_name: item.bn_name,
      latitude: Number(item.lat), longitude: Number(item.long), path: [item.name],
    }));
  }).filter((item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude));
  return candidates.sort((a, b) => distanceBetween(coordinates, a) - distanceBetween(coordinates, b))[0];
}
