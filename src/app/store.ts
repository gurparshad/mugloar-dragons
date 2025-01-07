import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';
import { apiSlice } from '../features/apiSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
