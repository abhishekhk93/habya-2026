import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import configReducer from './features/configSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
