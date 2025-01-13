import { Levels } from './constants';
import { decodeBase64 } from './helpers';

interface AdData {
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
}

export const applySorting = (ads: AdData[], config: { key: string; order: string }) => {
  const sorted = [...ads].sort((a, b) => {
    let valueA: number | string = a[config.key as keyof AdData];
    let valueB: number | string = b[config.key as keyof AdData];

    if (config.key === 'probability') {
      const decodedA = decodeBase64(valueA as string);
      const decodedB = decodeBase64(valueB as string);

      valueA = Levels.find((level) => level.probability === decodedA)?.value ?? 0;
      valueB = Levels.find((level) => level.probability === decodedB)?.value ?? 0;
    }

    if (config.order === 'ascending') {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    }

    if (valueA > valueB) return -1;
    if (valueA < valueB) return 1;
    return 0;
  });

  return sorted;
};
