import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import callFetchFamiliesApi from '../apicalls/families/fetchFamilies';
import type { Room } from './roomSlice';
import { showSnackbar } from './snackbarSlice';
import type { RootState } from './store';

export type Family = {
  id: number;
  name: string;
  roomId: number;
  status: 'ACTIVE' | 'LEFT';
  sourceOfIncome: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  room: Room | null;
};

type FamilyState = {
  families: Family[];
  errorMessage: string | null;
  loading: boolean;
};

const familySlice = createSlice({
  name: 'family',

  initialState: {
    families: [],
    loading: false,
    errorMessage: null,
  } as FamilyState,

  reducers: {
    updateLoadingAndError: (
      state,
      action: PayloadAction<{ loading: boolean; errorMessage?: string }>
    ) => {
      state.loading = action.payload.loading;
      state.errorMessage = action.payload.errorMessage || null;
    },

    setRooms: (state, action: PayloadAction<{ families: Family[] }>) => {
      state.families = action.payload.families;
      state.loading = false;
      state.errorMessage = null;
    },
  },
});

export const { updateLoadingAndError, setRooms } = familySlice.actions;
export default familySlice.reducer;

export const requestForFamilies = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => async (dispatch) => {
  dispatch(updateLoadingAndError({ loading: true }));
  try {
    const apiResponse = await callFetchFamiliesApi();
    const { families }: { families: Family[] } = apiResponse.data.data;
    dispatch(setRooms({ families }));
  } catch (error) {
    if (error.response) {
      const errorMessage: string = error.response.data.message;
      dispatch(updateLoadingAndError({ loading: true, errorMessage }));
      dispatch(showSnackbar({ message: errorMessage, type: 'error' }));
    }
  }
};
