import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '@/lib/fetchApi';
import type { ConfigData } from '@/app/_disabled_api/config/types';

interface ConfigState {
  data: ConfigData | null;
  lastFetched: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ConfigState = {
  data: null,
  lastFetched: null,
  status: 'idle',
};

export const fetchConfig = createAsyncThunk('config/fetchConfig', async () => {
  return await fetchApi<ConfigData>('/api/configs');
});

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const raw = action.payload;

        state.data = {
          ...raw,

          is_registration_open: raw.is_registration_open === "true",
          is_shirt_orders_open: raw.is_shirt_orders_open === "true",
          is_sponsorships_open: raw.is_sponsorships_open === "true",
          is_captcha_enabled: raw.is_captcha_enabled === "true",
        };

        state.lastFetched = Date.now();
      })
      .addCase(fetchConfig.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default configSlice.reducer;
