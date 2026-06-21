import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ticketAPI } from '../../services/api';

export const fetchMyTickets = createAsyncThunk(
  'tickets/fetchMyTickets',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await ticketAPI.getMyTickets(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch tickets');
    }
  }
);

export const validateQR = createAsyncThunk(
  'tickets/validateQR',
  async (qrCode, { rejectWithValue }) => {
    try {
      const { data } = await ticketAPI.validateQR(qrCode);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Invalid ticket');
    }
  }
);

const initialState = {
  tickets: [],
  currentTicket: null,
  validationResult: null,
  totalPages: 1,
  currentPage: 1,
  totalTickets: 0,
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    clearValidation: (state) => {
      state.validationResult = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalTickets = action.payload.totalTickets;
      })
      .addCase(fetchMyTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(validateQR.pending, (state) => {
        state.loading = true;
        state.validationResult = null;
      })
      .addCase(validateQR.fulfilled, (state, action) => {
        state.loading = false;
        state.validationResult = { success: true, data: action.payload };
      })
      .addCase(validateQR.rejected, (state, action) => {
        state.loading = false;
        state.validationResult = { success: false, message: action.payload };
      });
  },
});

export const { clearValidation, clearError } = ticketSlice.actions;
export default ticketSlice.reducer;
