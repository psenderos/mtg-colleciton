import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backendApiService } from '../services/backendApi';

export interface VersionState {
  version: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: VersionState = {
  version: null,
  loading: false,
  error: null,
};

// Async thunk for fetching version
export const fetchVersion = createAsyncThunk(
  'version/fetchVersion',
  async (_, { rejectWithValue }) => {
    try {
      const response = await backendApiService.getLastVersion();
      return response.version;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch version');
    }
  }
);

const versionSlice = createSlice({
  name: 'version',
  initialState,
  reducers: {
    clearVersion: (state) => {
      state.version = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVersion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVersion.fulfilled, (state, action) => {
        state.loading = false;
        state.version = action.payload;
        state.error = null;
      })
      .addCase(fetchVersion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearVersion } = versionSlice.actions;
export default versionSlice.reducer;