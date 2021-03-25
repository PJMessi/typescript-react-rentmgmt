import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './authSlice';
import snackbarReducer from './snackbarSlice';
// eslint-disable-next-line import/no-cycle
import roomReducer from './roomSlice';
// eslint-disable-next-line import/no-cycle
import invoiceReducer from './invoiceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    invoice: invoiceReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
