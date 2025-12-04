import { getAllMasterRequest } from "@/shared/api/master";
import { User } from "@/types/user";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MastersState {
  count: number;
  masters: User[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: MastersState = {
  masters: null,
  count: 0,
  loading: true,
  error: null,
};


export const getAllMaster =createAsyncThunk(
  "user/getAllMaster",
  async(_,thunkAPI)=>{
    try {
      const masters = await getAllMasterRequest()
      return masters.data
    } catch (error:any) {
       console.log("Ошибка запроса getAllMaster:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
)
const MastersSlices = createSlice({
  name: "masters",
  initialState,
  reducers: {},

  extraReducers:(builder)=>{
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
  }
});

// export const { } = ServicesSlice.actions;
export default MastersSlices.reducer;
