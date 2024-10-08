import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface FeatureState {
  value: number;
  loading: boolean;
  error: string | null;
}

const initialState: FeatureState = {
  value: 0,
  loading: false,
  error: null,
};

// Define an async thunk
export const fetchValue = createAsyncThunk('featureSlice/fetchValue', async () => {
  const response = await new Promise<{ value: number }>((resolve) => {
    setTimeout(() => {
      resolve({ value: Math.floor(Math.random() * 100) }); // Simulating an API response
    }, 1000);
  });
  return response.value;
});

const featureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchValue.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch value';
      });
  },
});

export const { increment, decrement, setValue } = featureSlice.actions;
export default featureSlice.reducer;
