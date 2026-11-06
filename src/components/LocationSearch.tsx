import React, { useState } from 'react';
import { searchLocations } from '../utils/searchLocations';
import type { LocationSearchResult, LocationType } from '../types/search';

export interface LocationSearchProps {
  value?: string;
  onChange?: (location: LocationSearchResult) => void;
  types?: LocationType[];
  placeholder?: string;
  language?: 'en' | 'bn';
  limit?: number;
  className?: string;
}

export default function LocationSearch({
  value = '',
  onChange,
  types,
  placeholder = 'Search Bangladesh locations',
  language = 'en',
  limit = 8,
  className = '',
}: LocationSearchProps) {
  const [query, setQuery] = useState(value);
  const results = query.trim() ? searchLocations({ query, types, limit }) : [];
  return (
    <div className={`relative ${className}`}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg" role="listbox">
          {results.map((result) => (
            <li key={`${result.type}-${result.id}`}>
              <button
                type="button"
                className="w-full px-4 py-3 text-left hover:bg-blue-50"
                onClick={() => {
                  setQuery(language === 'bn' ? result.bn_name : result.name);
                  onChange?.(result);
                }}
              >
                <span className="block font-medium">{language === 'bn' ? result.bn_name : result.name}</span>
                <span className="block text-xs text-gray-500">{result.type} · {result.path.join(' / ')}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
