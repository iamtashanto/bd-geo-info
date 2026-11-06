import divisionsData from '../data/bd-divisions.json';
import districtsData from '../data/bd-districts.json';
import upazilasData from '../data/bd-upazilas.json';
import unionsData from '../data/unions.json';
import postcodesData from '../data/bd-postcodes.json';
import type { District, Division, PostCode, UnionData, Upazila } from '../types';
import type { LocationSearchResult, LocationTree, SearchLocationsOptions } from '../types/search';

const aliases: Record<string, string> = {
  barishal: 'barisal',
  chittagong: 'chattagram',
  comilla: 'cumilla',
  jessore: 'jashore',
};

export function normalizeLocationQuery(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[য়য]/g, 'য়')
    .replace(/[^\w\u0980-\u09FF]+/g, '');
}

function normalizedAliases(value: string): string {
  const normalized = normalizeLocationQuery(value);
  return aliases[normalized] || normalized;
}

function score(query: string, names: string[]): number {
  const normalizedQuery = normalizedAliases(query);
  const normalizedNames = names.map(normalizedAliases);
  if (normalizedNames.some((name) => name === normalizedQuery)) return 0;
  if (normalizedNames.some((name) => name.startsWith(normalizedQuery))) return 1;
  return normalizedNames.some((name) => name.includes(normalizedQuery)) ? 2 : 99;
}

function coordinate(value?: string): number | undefined {
  const parsed = value === undefined ? NaN : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function buildResults(): LocationSearchResult[] {
  const divisions = divisionsData.divisions as Division[];
  const districts = districtsData.districts as District[];
  const upazilas = upazilasData as unknown as Record<string, Upazila[]>;
  const unions = unionsData as unknown as Record<string, UnionData[]>;
  const postcodes = postcodesData.postcodes as PostCode[];
  const results: LocationSearchResult[] = [];

  for (const division of divisions) {
    results.push({
      id: division.id, type: 'division', name: division.name, bn_name: division.bn_name,
      latitude: coordinate(division.lat), longitude: coordinate(division.long), path: [division.name],
    });
    for (const district of districts.filter((item) => item.division_id === division.id)) {
      results.push({
        id: district.id, type: 'district', name: district.name, bn_name: district.bn_name,
        divisionId: division.id, latitude: coordinate(district.lat), longitude: coordinate(district.long),
        path: [division.name, district.name],
      });
      for (const upazila of upazilas[district.id] || []) {
        results.push({
          id: upazila.id, type: 'upazila', name: upazila.name, bn_name: upazila.bn_name,
          divisionId: division.id, districtId: district.id, path: [division.name, district.name, upazila.name],
        });
        for (const union of unions[upazila.id] || []) {
          results.push({
            id: union.id, type: 'union', name: union.name, bn_name: union.bn_name,
            divisionId: division.id, districtId: district.id, upazilaId: upazila.id,
            path: [division.name, district.name, upazila.name, union.name],
          });
        }
      }
    }
  }
  for (const postcode of postcodes) {
    const district = districts.find((item) => item.id === postcode.district_id);
    const division = divisions.find((item) => item.id === postcode.division_id);
    results.push({
      id: postcode.postCode, type: 'postcode', name: postcode.postOffice, bn_name: postcode.postOffice,
      divisionId: postcode.division_id, districtId: postcode.district_id, postCode: postcode.postCode,
      postOffice: postcode.postOffice, path: [division?.name, district?.name, postcode.upazila, postcode.postOffice].filter(Boolean) as string[],
    });
  }
  return results;
}

const allLocations = buildResults();

export function searchLocations(options: SearchLocationsOptions): LocationSearchResult[] {
  const query = options.query.trim();
  if (!query) return [];
  const types = options.types || ['division', 'district', 'upazila', 'union', 'postcode'];
  return allLocations
    .filter((location) => types.includes(location.type))
    .filter((location) => !options.divisionId || location.divisionId === options.divisionId || (location.type === 'division' && location.id === options.divisionId))
    .filter((location) => !options.districtId || location.districtId === options.districtId || (location.type === 'district' && location.id === options.districtId))
    .map((location) => ({ location, rank: score(query, [location.name, location.bn_name, location.id, location.postCode || '']) }))
    .filter(({ rank }) => rank < 99)
    .sort((a, b) => a.rank - b.rank || a.location.path.length - b.location.path.length || a.location.name.localeCompare(b.location.name))
    .slice(0, options.limit ?? 20)
    .map(({ location }) => location);
}

export function findLocation(query: string, types?: LocationSearchResult['type'][]): LocationSearchResult | undefined {
  return searchLocations({ query, types, limit: 1 })[0];
}

export async function searchLocationsAsync(options: SearchLocationsOptions): Promise<LocationSearchResult[]> {
  return searchLocations(options);
}

export async function findLocationAsync(query: string, types?: LocationSearchResult['type'][]): Promise<LocationSearchResult | undefined> {
  return findLocation(query, types);
}

export function getLocationTree(): LocationTree {
  const divisions = divisionsData.divisions as Division[];
  const districts = districtsData.districts as District[];
  const upazilas = upazilasData as unknown as Record<string, Upazila[]>;
  const unions = unionsData as unknown as Record<string, UnionData[]>;
  return {
    divisions: divisions.map((division) => ({
      ...division,
      districts: districts.filter((district) => district.division_id === division.id).map((district) => ({
        ...district,
        upazilas: (upazilas[district.id] || []).map((upazila) => ({
          ...upazila, unions: unions[upazila.id] || [],
        })),
      })),
    })),
  };
}

export async function getLocationTreeAsync(): Promise<LocationTree> {
  return getLocationTree();
}
