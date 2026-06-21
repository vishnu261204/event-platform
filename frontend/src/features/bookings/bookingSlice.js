import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookingAPI } from '../../services/api';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await bookingAPI.getAll(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const { data } = await bookingAPI.create(bookingData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create booking');
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await bookingAPI.cancel(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel booking');
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  'bookings/fetchMyBookings',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await bookingAPI.getMyBookings(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const fetchEventBookings = createAsyncThunk(
  'bookings/fetchEventBookings',
  async ({ eventId, params }, { rejectWithValue }) => {
    try {
      const { data } = await bookingAPI.getEventBookings(eventId, params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch event bookings');
    }
  }
);

export const checkInAttendee = createAsyncThunk(
  'bookings/checkIn',
  async (bookingId, { rejectWithValue }) => {
    try {
      const { data } = await bookingAPI.checkIn(bookingId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Check-in failed');
    }
  }
);

const initialState = {
  bookings: [],
  myBookings: [],
  eventBookings: [],
  currentBooking: null,
  totalPages: 1,
  currentPage: 1,
  totalBookings: 0,
  loading: false,
  error: null,
  checkInStatus: null,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCheckInStatus: (state) => {
      state.checkInStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalBookings = action.payload.totalBookings;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const idx = state.bookings.findIndex((b) => b._id === action.payload.booking?._id);
        if (idx !== -1) state.bookings[idx] = action.payload.booking;
      })
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.myBookings = action.payload.bookings;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.eventBookings = action.payload.bookings;
      })
      .addCase(fetchEventBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkInAttendee.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkInAttendee.fulfilled, (state, action) => {
        state.loading = false;
        state.checkInStatus = action.payload;
      })
      .addCase(checkInAttendee.rejected, (state, action) => {
        state.loading = false;
        state.checkInStatus = { success: false, message: action.payload };
      });
  },
});

export const { clearError, clearCheckInStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
