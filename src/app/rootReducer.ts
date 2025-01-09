import { combineReducers } from 'redux';

import { apiSlice } from '../features/apiSlice';
import errorSlice from '../features/errorSlice';
import gameSlice from '../features/gameSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  game: gameSlice,
  error: errorSlice,
});

export default rootReducer;
