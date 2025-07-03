import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import versionReducer from './versionSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    version: versionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;