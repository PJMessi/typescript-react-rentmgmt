import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SnackbarType = 'error' | 'warning' | 'info' | 'success';

const initialState: {
  open: boolean;
  message: string | null;
  type: SnackbarType | null;
} = {
  open: false,
  message: null,
  type: null,
};

export const snackbarSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; type: SnackbarType }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },

    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
