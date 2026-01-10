import { getAllServicesRequest } from "@/shared/api/services";
import { Service } from "@/types/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";





interface ServicesState {
  count: number;
  services:Service[],
  hasMore:boolean,
  loading: boolean,
  error: string | null;

}

export const getAllServives = createAsyncThunk(
  "service/getAllServices",
  async ({limit,page,search}:{limit:number,page:number,search?:string}, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const res = await getAllServicesRequest(limit,page,search);
      
      return res.data; 
      
    } catch (error: any) {
      console.log("Ошибка запроса getAllServices:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const initialState: ServicesState = {
  count: 0,
  services:[],
  loading:false,
  error: null,
  hasMore:true,
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
          const {data,hasMore,totalCount}= action.payload;
          if(action.meta.arg.page ===0){
            state.services=data
          }else{
            state.services= [...state.services,...data]
          }
          state.hasMore=hasMore
          state.count = totalCount;

        });
        builder.addCase(getAllServives.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  }
});

export const { } = ServicesSlice.actions;
export default ServicesSlice.reducer;
