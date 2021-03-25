import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import type { RootState } from './store';
import callFetchRoomsApi from '../apicalls/rooms/fetchRooms';
import { showSnackbar } from './snackbarSlice';

export type Room = {
  id: number;
  name: string;
  description: string;
  status: 'OCCUPIED' | 'EMPTY';
  price: number;
};

export type RoomState = {
  loading: boolean;
  rooms: Room[];
  errorMessage: string | null;
};

export const roomSlice = createSlice({
  name: 'room',

  initialState: {
    loading: false,
    rooms: [],
    errorMessage: null,
  } as RoomState,

  reducers: {
    updateLoadingAndError: (
      state,
      action: PayloadAction<{ loading: boolean; errorMessage?: string }>
    ) => {
      state.loading = action.payload.loading;
      state.errorMessage = action.payload.errorMessage || null;
    },

    setRooms: (state, action: PayloadAction<{ rooms: Room[] }>) => {
      state.rooms = action.payload.rooms;
      state.loading = false;
      state.errorMessage = null;
    },
  },
});

export const { updateLoadingAndError, setRooms } = roomSlice.actions;
export default roomSlice.reducer;

export const requestForRooms = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => async (dispatch) => {
  dispatch(updateLoadingAndError({ loading: true }));
  try {
    const apiResponse = await callFetchRoomsApi();
    const { rooms }: { rooms: Room[] } = apiResponse.data.data;
    dispatch(setRooms({ rooms }));
  } catch (error) {
    if (error.response) {
      const errorMessage: string = error.response.data.message;
      dispatch(updateLoadingAndError({ loading: true, errorMessage }));
      dispatch(showSnackbar({ message: errorMessage, type: 'error' }));
    }
  }
};
