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
        state.data = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchConfig.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default configSlice.reducer;
