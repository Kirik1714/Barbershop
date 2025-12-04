import { getAllServicesRequest } from "@/shared/api/services";
import { Service } from "@/types/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";





interface ServicesState {
  count: number;
  services:Service[] | null,
  loading: boolean,
  error: string | null;

}

export const getAllServives = createAsyncThunk(
  "service/getAllServices",
  async (_, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const res = await getAllServicesRequest();
      
      return res.data; 
      
    } catch (error: any) {
      console.log("Ошибка запроса getAllServices:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const initialState: ServicesState = {
  count: 0,
  services:null,
  loading:false,
  error: null,
};

const ServicesSlice = createSlice({
  name: "services",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    //getAllServices
        builder.addCase(getAllServives.pending, (state) => {
          state.loading = true;
          state.error = null;
        });
        builder.addCase(getAllServives.fulfilled, (state, action) => {
          state.loading = false;
          state.services = action.payload.data;
          state.count = action.payload.data.length || 0;

        });
        builder.addCase(getAllServives.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const { } = ServicesSlice.actions;
export default ServicesSlice.reducer;
