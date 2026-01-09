import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Preferences } from "@capacitor/preferences";

export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
}

interface AuthState {
  token: string | null;
  user: User | null;
  refresh_token: string | null;
  isLoading: boolean;
  onboardingCompleted: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  refresh_token: null,
  isLoading: false,
  onboardingCompleted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOnboardingCompleted: (state) => {
      state.onboardingCompleted = true;
      Preferences.set({ key: "onboarding", value: "true" });
    },
    setAuth: (
      state,
      action: PayloadAction<{
        token: string;
        user: User;
        refresh_token?: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.refresh_token = action.payload.refresh_token || null;
      state.isLoading = false;

      Preferences.set({ key: "token", value: action.payload.token });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.refresh_token = null;
      Preferences.remove({ key: "token" });
      Preferences.remove({ key: "refreshToken" });
    },
  },
});

export const { setAuth, logout, setLoading, setOnboardingCompleted } =
  authSlice.actions;
export default authSlice.reducer;
