import { Levels } from './constants';

export const getGameLevelCode = (probability: string) => {
  for (const level of Levels) {
    if (level.probability === probability) {
      return level.value;
    }
  }
  return null;
};

const isBase64 = (str: string) => {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
};

export const decodeBase64 = (str: string) => {
  return isBase64(str) ? atob(str) : str;
};
