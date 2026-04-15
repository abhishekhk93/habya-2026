import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import configReducer from './features/configSlice';

export const makeStore = () => configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
  },
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
