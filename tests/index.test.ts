import {
  getDivisions,
  getDistricts,
  getUpazilas,
  getUnions,
  getUnionsList,
  getUnionsSync,
  getPostCodes,
  formatAddress,
  validatePostCode,
  getPlaces,
  searchLocations,
  findLocation,
  validateAddress,
  distanceBetween,
} from '../src/index';

describe('bd-geo-info core functionality', () => {
  it('should return all 8 divisions in English and Bangla', async () => {
    const enDivs = await getDivisions('en');
    expect(enDivs).toHaveLength(8);
    expect(enDivs.find(d => d.value === '3')?.label).toBe('Dhaka');

    const bnDivs = await getDivisions('bn');
    expect(bnDivs).toHaveLength(8);
    expect(bnDivs.find(d => d.value === '3')?.label).toBe('ঢাকা');
  });

  it('should return districts for a division', async () => {
    const districts = await getDistricts('3', 'en'); // Dhaka division
    expect(districts.length).toBeGreaterThan(0);
    expect(districts.some(d => d.label === 'Dhaka')).toBe(true);
  });

  it('should return upazilas for a district', async () => {
    const upazilas = await getUpazilas('1', 'en');
    expect(upazilas.length).toBeGreaterThan(0);
  });

  it('should return unions asynchronously and synchronously', async () => {
    const unionsAsync = await getUnions('1', 'en');
    expect(unionsAsync.length).toBeGreaterThan(0);

    const unionsSync = getUnionsSync('1');
    expect(unionsSync.length).toBe(unionsAsync.length);
  });

  it('should return postcodes for a district', async () => {
    const postcodes = await getPostCodes('1');
    expect(postcodes.length).toBeGreaterThan(0);
  });

  it('should format addresses properly', async () => {
    const formatted = await formatAddress('1', '30', '230', '2087', '8200', 'Road 27', 'en');
    expect(formatted).toContain('Road 27');
    expect(formatted).toContain('8200');
  });

  it('should validate postal codes', () => {
    expect(validatePostCode('1205')).toBe(true);
    expect(validatePostCode('12055')).toBe(false);
    expect(validatePostCode('abc')).toBe(false);
  });

  it('should search locations by query', () => {
    const results = searchLocations({ query: 'dhaka' });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name.toLowerCase()).toContain('dhaka');
  });

  it('should find single location', () => {
    const loc = findLocation('dhaka');
    expect(loc).toBeDefined();
  });

  it('should find places with getPlaces', async () => {
    const places = await getPlaces({ query: 'kuakata' });
    expect(places.length).toBeGreaterThan(0);
    expect(places[0].name.toLowerCase()).toBe('kuakata');
  });

  it('should calculate distance between coordinates', () => {
    const dist = distanceBetween(
      { latitude: 23.8103, longitude: 90.4125 }, // Dhaka
      { latitude: 22.3569, longitude: 91.7832 }  // Chittagong
    );
    expect(dist).toBeGreaterThan(200);
    expect(dist).toBeLessThan(300);
  });
});
