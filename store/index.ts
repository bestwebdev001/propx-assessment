import { configureStore } from '@reduxjs/toolkit';
import app, { loadStoredIsCashMode } from '@/store/slices/app.slice';
import { Env } from '@/types/env';
import logger from 'redux-logger';
import { config } from '@/utils';

const store = configureStore({
  reducer: {
    app,
    // add more store ...
  },
  middleware: getDefaultMiddleware =>
    config.env === Env.dev ? getDefaultMiddleware() : getDefaultMiddleware().concat(logger),
  devTools: config.env === Env.dev,
});

loadStoredIsCashMode(store.dispatch);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
