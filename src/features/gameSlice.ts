import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GameState {
  gameId: string | null;
  score: number;
  gold: number;
  lives: number;
}

const initialState: GameState = {
  gameId: null,
  score: 0,
  gold: 0,
  lives: 3,
};

interface SetGamePayload {
  gameId: string;
  score: number;
  gold: number;
  lives: number;
}

interface UpdateStatsPayload {
  score: number;
  gold: number;
  lives: number;
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
    },
    updateStats(state, action: PayloadAction<UpdateStatsPayload>) {
      state.score = action.payload.score;
      state.gold = action.payload.gold;
      state.lives = action.payload.lives;
    },
  },
});

export const {setGame, updateStats} = gameSlice.actions;

export default gameSlice.reducer;
