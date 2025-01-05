import {Levels} from "./constants";

export const getGameLevelCode = (probability: string) => {
  for (const level of Levels) {
    if (level.probability === probability) {
      return level.value;
    }
  }
};
