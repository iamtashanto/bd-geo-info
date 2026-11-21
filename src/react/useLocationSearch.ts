import { useMemo } from 'react';
import { searchLocations } from '../utils/searchLocations.js';
import type { LocationSearchResult, SearchLocationsOptions } from '../types/search.js';

export function useLocationSearch(options: SearchLocationsOptions): LocationSearchResult[] {
  const { query, types, divisionId, districtId, limit } = options;
  return useMemo(
    () => searchLocations({ query, types, divisionId, districtId, limit }),
    [query, types?.join(','), divisionId, districtId, limit],
  );
}
