import {
  getAllMasterRequest,
  getScheduleByMasterRequest,
} from "@/shared/api/master";
import { User } from "@/types/user";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MastersState {
  count: number;
  masters: User[] | null;
  schedule: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

const initialState: MastersState = {
  masters: null,
  count: 0,
  schedule: null,
  loading: false,
  error: null,
};

export const getAllMaster = createAsyncThunk(
  "user/getAllMaster",
  async (_, thunkAPI) => {
    try {
      const masters = await getAllMasterRequest();
      return masters.data;
    } catch (error: any) {
      console.log("Ошибка запроса getAllMaster:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);
export const getScheduleByMaster = createAsyncThunk(
  "users/getScheduleByMaster",
  async (
    { masterId, month }: { masterId: string; month: string },
    thunkAPI
  ) => {
    try {
      const res = await getScheduleByMasterRequest(masterId, month);
      return res;
    } catch (error: any) {
      console.log("Ошибка запроса getScheduleByMaster:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const MastersSlices = createSlice({
  name: "masters",
  initialState,
  reducers: {
    clearSchedule: (state) => {
      state.schedule = null;
    },
  },

  extraReducers: (builder) => {
    //getAllMaster
    builder.addCase(getAllMaster.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllMaster.fulfilled, (state, action) => {
      state.loading = false;
      state.masters = action.payload.data;
      state.count = action.payload.length || 0;
    });
    builder.addCase(getAllMaster.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // getScheduleByMaster
    builder.addCase(getScheduleByMaster.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getScheduleByMaster.fulfilled, (state, action) => {
      state.loading = false;
      state.schedule = action.payload; 
    });
    builder.addCase(getScheduleByMaster.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSchedule } = MastersSlices.actions;
export default MastersSlices.reducer;
