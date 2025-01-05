import {combineReducers} from "redux";
import {apiSlice} from "../features/apiSlice";
import gameSlice from "../features/gameSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  game: gameSlice,
});

export default rootReducer;
