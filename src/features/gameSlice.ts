import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GameState {
  gameId: string | null;
  score: number;
  gold: number;
  lives: number;
  level: number;
}

const initialState: GameState = {
  gameId: null,
  score: 0,
  gold: 0,
  lives: 3,
  level: 1,
};

interface SetGamePayload {
  gameId: string;
  score: number;
  gold: number;
  lives: number;
  level: number;
}

interface UpdateStatsPayload {
  score: number;
  gold: number;
  lives: number;
  level?: number;
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame(state, action: PayloadAction<SetGamePayload>) {
      state.gameId = action.payload.gameId;
      state.score = action.payload.score;
      state.gold = action.payload.gold;
      state.lives = action.payload.lives;
      state.level = action.payload.level;
    },
    updateStats(state, action: PayloadAction<UpdateStatsPayload>) {
      state.score = action.payload.score;
      state.gold = action.payload.gold;
      state.lives = action.payload.lives;
      if (action.payload.level) {
        state.level = action.payload.level;
      }
    },
    increaseLevel(state) {
      state.level += 1;
    },
  },
});

export const {setGame, updateStats, increaseLevel} = gameSlice.actions;

export default gameSlice.reducer;
