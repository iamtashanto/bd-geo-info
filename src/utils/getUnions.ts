import { UnionData } from '../types/index.js';
import unionsDataRaw from '../data/unions.json';

const unionsData = unionsDataRaw as unknown as Record<string, UnionData[]>;

export const getUnions = async (upazilaId: string, language: 'en' | 'bn' = 'en'): Promise<{ value: string; label: string }[]> => {
  try {
    const list = unionsData[upazilaId] || [];
    return list.map((union: UnionData) => ({
      value: union.id,
      label: language === 'en' ? union.name : union.bn_name
    }));
  } catch (error) {
    console.error('Error fetching unions:', error);
    return [];
  }
};

export function getUnionsList(upazilaId: string): UnionData[] {
  if (!upazilaId) {
    return [];
  }

  try {
    const list = unionsData[upazilaId] || [];
    return [...list].sort((a: UnionData, b: UnionData) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching unions:', error);
    return [];
  }
}
