import type { Place, PlaceKind } from '../types';
import upazilasData from '../data/bd-upazilas.json';

type Row = [string, string, string, number, number];
interface PlacesFile {
  attribution: string;
  byUpazila: Record<string, Row[]>;
  byDistrict: Record<string, Row[]>;
}

const upazilas = upazilasData as unknown as Record<string, { id: string }[]>;
const fold = (s: string) => s.normalize('NFKC').toLowerCase().replace(/[^\wঀ-৿]+/g, '');

const toPlace = (r: Row, district_id: string, upazila_id: string | null): Place => ({
  name: r[0],
  bn_name: r[1] || r[0],
  kind: r[2] as PlaceKind,
  latitude: r[3],
  longitude: r[4],
  district_id,
  upazila_id,
});

/**
 * Villages, towns, bazaars, islands, beaches and well-known areas (Kuakata, Sajek, Inani...), for when someone knows the place
 * and not the upazila. Loaded on first use (about 2 MB), like unions.
 *
 *   await getPlaces({ query: 'kuakata' })          // by English or Bangla name
 *   await getPlaces({ upazila: '123' })            // everything in one upazila
 *   await getPlaces({ district: '47', kind: 'MARKET' })
 *
 * Every result carries its district and (where known) upazila id, so `getUpazilas`, `getUnions` and `getPostCodes` follow on.
 * Source: GeoNames (CC BY 4.0, credit "GeoNames" where the data is shown) plus a hand-checked list. Positions are rounded to ~10 m.
 */
export async function getPlaces(options: { query?: string; upazila?: string; district?: string; kind?: PlaceKind; limit?: number } = {}): Promise<Place[]> {
  const file = (await import('../data/bd-places.json')).default as unknown as PlacesFile;
  const limit = Math.max(1, Math.min(options.limit ?? 50, 500));
  const q = options.query ? fold(options.query) : '';
  const out: Place[] = [];
  const take = (rows: Row[] | undefined, district_id: string, upazila_id: string | null) => {
    for (const r of rows ?? []) {
      if (options.kind && r[2] !== options.kind) continue;
      if (q && !fold(r[0]).includes(q) && !fold(r[1]).includes(q)) continue;
      out.push(toPlace(r, district_id, upazila_id));
    }
  };
  const districtOf = (upazilaId: string) => Object.entries(upazilas).find(([, list]) => list.some((u) => u.id === upazilaId))?.[0] ?? '';

  if (options.upazila) take(file.byUpazila[options.upazila], districtOf(options.upazila), options.upazila);
  else if (options.district) {
    for (const u of upazilas[options.district] ?? []) take(file.byUpazila[u.id], options.district, u.id);
    take(file.byDistrict[options.district], options.district, null);
  } else {
    for (const [d, list] of Object.entries(upazilas)) for (const u of list) take(file.byUpazila[u.id], d, u.id);
    for (const [d, rows] of Object.entries(file.byDistrict)) take(rows, d, null);
  }
  // exact name first, then names that start with the search, then the rest; shorter names before longer
  const rank = (p: Place) => (q && fold(p.name) === q ? 0 : q && fold(p.name).startsWith(q) ? 1 : 2);
  return out.sort((a, b) => rank(a) - rank(b) || a.name.length - b.name.length || a.name.localeCompare(b.name)).slice(0, limit);
}
