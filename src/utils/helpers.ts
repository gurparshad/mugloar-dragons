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
  if (!str || str.trim() === '') return false;

  if (str.length % 4 !== 0) return false;

  const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
  if (!base64Regex.test(str)) return false;

  try {
    const decoded = atob(str);

    if (!/^[\x20-\x7E]*$/.test(decoded)) return false;

    return true;
  } catch {
    return false;
  }
};

export const decodeBase64 = (str: string) => {
  return isBase64(str) ? atob(str) : str;
};
