import assert from 'node:assert';
import { createRequire } from 'node:module';

// Test 1: ESM entrypoint "."
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
} from 'bd-geo-info';

const enDivisions = await getDivisions('en');
assert.strictEqual(enDivisions.length, 8, 'ESM: getDivisions should return 8 divisions');
assert.strictEqual(enDivisions.find(d => d.value === '3')?.label, 'Dhaka');

const bnDivisions = await getDivisions('bn');
assert.strictEqual(bnDivisions.length, 8, 'ESM: getDivisions(bn) should return 8 divisions');
assert.strictEqual(bnDivisions.find(d => d.value === '3')?.label, 'ঢাকা');

const districts = await getDistricts('1', 'en');
assert.ok(districts.length > 0, 'ESM: getDistricts should return districts');

const upazilas = await getUpazilas('1', 'en');
assert.ok(upazilas.length > 0, 'ESM: getUpazilas should return upazilas');

const unionsAsync = await getUnions('1', 'en');
assert.ok(unionsAsync.length > 0, 'ESM: getUnions should return unions');

const unionsSync = getUnionsSync('1');
assert.strictEqual(unionsSync.length, unionsAsync.length, 'ESM: getUnionsSync should return unions');

const places = await getPlaces({ query: 'kuakata' });
assert.ok(places.length > 0, 'ESM: getPlaces should find places');
assert.strictEqual(places[0].name.toLowerCase(), 'kuakata');

// Test 2: ESM entrypoint "./react"
import {
  AddressForm,
  DivisionSelect,
  DistrictSelect,
  UpazilaSelect,
  UnionSelect,
  LocationSearch,
  useLocationSearch,
  getDivisions as getDivisionsFromReact,
} from 'bd-geo-info/react';

assert.strictEqual(typeof AddressForm, 'function', 'ESM: AddressForm should be a component');
assert.strictEqual(typeof DivisionSelect, 'function', 'ESM: DivisionSelect should be a component');
assert.strictEqual(typeof DistrictSelect, 'function', 'ESM: DistrictSelect should be a component');
assert.strictEqual(typeof UpazilaSelect, 'function', 'ESM: UpazilaSelect should be a component');
assert.strictEqual(typeof UnionSelect, 'function', 'ESM: UnionSelect should be a component');
assert.strictEqual(typeof LocationSearch, 'function', 'ESM: LocationSearch should be a component');
assert.strictEqual(typeof useLocationSearch, 'function', 'ESM: useLocationSearch should be a hook');
assert.strictEqual((await getDivisionsFromReact('en')).length, 8, 'ESM: getDivisions from react should return 8 divisions');

// Test 3: CommonJS entrypoint "."
const require = createRequire(import.meta.url);
const cjsMain = require('bd-geo-info');
assert.strictEqual(typeof cjsMain.getDivisions, 'function', 'CJS: getDivisions should be a function');
const cjsDivisions = await cjsMain.getDivisions('en');
assert.strictEqual(cjsDivisions.length, 8, 'CJS: getDivisions should return 8 divisions');
assert.strictEqual(cjsMain.getUnionsSync('1').length, unionsSync.length, 'CJS: getUnionsSync should match');

// Test 4: CommonJS entrypoint "./react"
const cjsReact = require('bd-geo-info/react');
assert.strictEqual(typeof cjsReact.AddressForm, 'function', 'CJS: AddressForm should be a component');
assert.strictEqual((await cjsReact.getDivisions('en')).length, 8, 'CJS: getDivisions from react should return 8 divisions');

console.log('All ESM and CJS integration assertions passed successfully!');
