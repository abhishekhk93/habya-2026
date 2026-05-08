import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchApi } from '@/lib/fetchApi';
import type { LoginRequest, LoginResponse } from '@/app/_disabled_api/auth/login/types';

interface AuthState {
  user: LoginResponse | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: true,
};

export const fetchSession = createAsyncThunk(
  'auth/fetchSession',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchApi<LoginResponse>("/api/auth/me");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch session');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const data = await fetchApi<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: credentials,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData: { fullName: string; phone: string; gender: string; dob: string; captchaToken: string }, { rejectWithValue }) => {
    try {
      const data = await fetchApi<{ playerId: string; fullName: string }>("/api/auth/signup", {
        method: "POST",
        body: userData,
      });
      const fullUser: LoginResponse = {
        phone: userData.phone,
        playerId: data.playerId,
        fullName: data.fullName,
        dob: userData.dob,
        gender: userData.gender,
        role: "player"
      };
      return fullUser;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await fetchApi("/api/auth/logout", {
        method: "GET",
      });
    } catch (err: any) {
      return rejectWithValue(err.message || 'Logout failed');
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSession.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSession.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    });
    builder.addCase(fetchSession.rejected, (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(signupUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isLoggedIn = false;
    });

    builder.addCase(logoutUser.rejected, (state) => {
      // Even if API fails, clear local state
      state.user = null;
      state.isLoggedIn = false;
    });
  },
});

export const { setSession, logout } = authSlice.actions;
export default authSlice.reducer;

