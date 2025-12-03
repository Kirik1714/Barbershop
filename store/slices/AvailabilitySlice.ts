import { getAvailabilityRequest } from "@/shared/api/availability";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AvailabilityState {
  slots: string[]; 
  loading: boolean;
  error: string | null;
}

const initialState: AvailabilityState = {
  slots: [],
  loading: false,
  error: null,
};

export const getAvailability = createAsyncThunk(
  "availability/getAvailability",
  async (
    payload: { serviceId: number; masterId: number; date: string },
    thunkAPI
  ) => {
    try {
      const { serviceId, masterId, date } = payload;
      const res = await getAvailabilityRequest(serviceId, masterId, date);
     
      return res; 
    } catch (error: any) {
      console.log("Ошибка запроса getAvailabilityRequest:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error"
      );
    }
  }
);

const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailability.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAvailability.fulfilled, (state, action) => {
      state.loading = false
    state.slots = action.payload?.slots || [];
    console.log( action.payload);
    
    });
    builder.addCase(getAvailability.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default availabilitySlice.reducer;
