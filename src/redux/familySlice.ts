import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import callFetchFamiliesApi from '../apicalls/families/fetchFamilies';
import callFetchFamilyApi from '../apicalls/families/fetchFamily';
import type { Room } from './roomSlice';
import { showSnackbar } from './snackbarSlice';
import type { RootState } from './store';

export type Member = {
  id: number;
  familyId: number;
  name: string;
  email: string | null;
  mobile: string | null;
  birthDay: Date;
  createdAt: Date;
  updatedAt: Date;
};

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
  members: Member[];
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

    setFamilies: (state, action: PayloadAction<{ families: Family[] }>) => {
      state.families = action.payload.families;
      state.loading = false;
      state.errorMessage = null;
    },

    setFamily: (state, action: PayloadAction<{ family: Family }>) => {
      const familyIndex = state.families.findIndex(
        (stateFamily) => stateFamily.id === action.payload.family.id
      );

      if (familyIndex === -1) {
        state.families.push(action.payload.family);
      } else {
        state.families[familyIndex] = action.payload.family;
      }
    },
  },
});

export const {
  updateLoadingAndError,
  setFamilies,
  setFamily,
} = familySlice.actions;
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
    dispatch(setFamilies({ families }));
  } catch (error) {
    if (error.response) {
      const errorMessage: string = error.response.data.message;
      dispatch(updateLoadingAndError({ loading: true, errorMessage }));
      dispatch(showSnackbar({ message: errorMessage, type: 'error' }));
    }
  }
};

export const requestForFamily = (
  familyId: number
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  dispatch(updateLoadingAndError({ loading: true }));
  try {
    const apiResponse = await callFetchFamilyApi(familyId);
    const { family }: { family: Family } = apiResponse.data.data;
    dispatch(setFamily({ family }));
  } catch (error) {
    if (error.response) {
      const errorMessage: string = error.response.data.message;
      dispatch(updateLoadingAndError({ loading: true, errorMessage }));
      dispatch(showSnackbar({ message: errorMessage, type: 'error' }));
    }
  }
};
