import { configureStore, ThunkDispatch, PayloadAction } from '@reduxjs/toolkit';
import reposReducer from '@features/repos/slice';

export const store = configureStore({
  reducer: {
    repos: reposReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = ThunkDispatch<RootState, unknown, PayloadAction>;
