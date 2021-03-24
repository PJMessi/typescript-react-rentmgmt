import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

const initialState: {
  isLoggedIn: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  token: string | null;
  loading: boolean;
  error: {
    message: string;
  } | null;
} = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// eslint-disable-next-line import/prefer-default-export
export const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },

    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.user = action.payload.user;

      state.token = action.payload.token;

      state.isLoggedIn = true;

      state.loading = false;

      state.error = null;
    },

    loginError: (
      state,
      action: PayloadAction<{ error: { message: string } }>
    ) => {
      state.loading = false;

      state.error = action.payload.error;
    },
  },
});

export const { loginRequest, loginSuccess, loginError } = authSlice.actions;

export default authSlice.reducer;
