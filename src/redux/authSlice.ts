import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import type { RootState } from './store';
import callLoginApi from '../apicalls/auth/loginApiCall';
import { showSnackbar } from './snackbarSlice';
import axiosInterface from '../apicalls/axiosInstance';

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  errorMessage: string | null;
};

export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
    loading: false,
    errorMessage: null,
  } as AuthState,

  reducers: {
    updateLoadingAndError: (
      state,
      action: PayloadAction<{ loading: boolean; errorMessage?: string }>
    ) => {
      state.loading = action.payload.loading;
      state.errorMessage = action.payload.errorMessage || null;
    },

    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.loading = false;
      state.errorMessage = null;
    },
  },
});

export const { updateLoadingAndError, login } = authSlice.actions;
export default authSlice.reducer;

/** Makes API request to login user and updates the state and localstorage accordingly. */
export const requestLogin = (credentials: {
  email: string;
  password: string;
}): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  dispatch(updateLoadingAndError({ loading: true }));
  try {
    const apiResponse = await callLoginApi(credentials);

    const { token }: { token: string } = apiResponse.data.data;
    const { user }: { user: User } = apiResponse.data.data;
    dispatch(login({ token, user }));

    localStorage.setItem('token', token);
    axiosInterface.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (error) {
    if (error.response) {
      const errorMessage: string = error.response.data.message;
      dispatch(updateLoadingAndError({ loading: true, errorMessage }));
      dispatch(showSnackbar({ message: errorMessage, type: 'error' }));
    }
  }
};
