import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GameState {
  gameId: string | null;
  score: number;
  gold: number;
  lives: number;
  level: number;
}

interface SetGamePayload {
  gameId: string;
  score: number;
  gold: number;
  lives: number;
  level: number;
}

interface UpdateStatsPayload {
  score?: number;
  gold: number;
  lives?: number;
  level?: number;
}

const loadGameState = (): GameState => {
  const savedState = localStorage.getItem("gameState");
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    gameId: null,
    score: 0,
    gold: 0,
    lives: 3,
    level: 1,
  };
};

const initialState: GameState = loadGameState();

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
      localStorage.setItem("gameState", JSON.stringify(state));
    },
    updateStats(state, action: PayloadAction<UpdateStatsPayload>) {
      state.gold = action.payload.gold;
      state.score = action.payload.score ?? state.score;
      state.lives = action.payload.lives ?? state.lives;
      state.level = action.payload.level ?? state.level;
      localStorage.setItem("gameState", JSON.stringify(state));
    },
    resetGame(state) {
      state.gameId = null;
      state.score = 0;
      state.gold = 0;
      state.lives = 3;
      state.level = 0;
      localStorage.removeItem("gameState");
    },
  },
});

export const {setGame, updateStats, resetGame} = gameSlice.actions;

export default gameSlice.reducer;
