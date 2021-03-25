import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import callFetchInvoicesApi from '../apicalls/invoices/fetchInvoices';
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
};

type Invoice = {
  id: number;
  familyId: number;
  amount: number;
  endDate: Date;
  startDate: Date;
  status: 'PENDING' | 'PAID';
  createdAt: Date;
  updatedAt: Date;
  family: Family;
};

type InvoiceState = {
  loading: boolean;
  errorMessage: string | null;
  invoices: Invoice[];
};

const invoiceSlice = createSlice({
  name: 'invoice',

  initialState: {
    loading: false,
    errorMessage: null,
    invoices: [],
  } as InvoiceState,

  reducers: {
    updateLoadingAndError: (
      state,
      action: PayloadAction<{ loading: boolean; errorMessage?: string }>
    ) => {
      state.loading = action.payload.loading;
      state.errorMessage = action.payload.errorMessage || null;
    },

    setInvoices: (state, action: PayloadAction<{ invoices: Invoice[] }>) => {
      state.invoices = action.payload.invoices;
      state.loading = false;
      state.errorMessage = null;
    },
  },
});

export const { updateLoadingAndError, setInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;

export const requestForInvoices = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => async (dispatch) => {
  dispatch(updateLoadingAndError({ loading: true }));
  try {
    const apiResponse = await callFetchInvoicesApi();
    const { invoices }: { invoices: Invoice[] } = apiResponse.data.data;
    dispatch(setInvoices({ invoices }));
  } catch (error) {
    if (error.response) {
      const errorMessage: string = error.response.data.message;
      dispatch(updateLoadingAndError({ loading: true, errorMessage }));
      dispatch(showSnackbar({ message: errorMessage, type: 'error' }));
    }
  }
};
