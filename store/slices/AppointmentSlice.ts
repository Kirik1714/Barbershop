import { getMyAppointmentsRequest } from "@/shared/api/appointment";
import { IAppointment } from "@/types/appointment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AppointmentSlice {
  appointments: IAppointment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AppointmentSlice = {
  appointments: [],
  isLoading: false,
  error: null,
};

export const getMyAppointments = createAsyncThunk(
    "appointments/getMyAppointments",
    async(_,thunkAPI)=>{
        try {
        const res = await getMyAppointmentsRequest();
        console.log('-----------',res);
        return res;
        } catch (error:any) {
            console.log("Ошибка запроса getMyAppointments:", error);

      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
        }

    }
)

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    //getMyAppointments
     builder.addCase(getMyAppointments.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        });
        builder.addCase(getMyAppointments.fulfilled, (state, action) => {
          state.isLoading = false;
          state.appointments=action.payload
         
        });
        builder.addCase(getMyAppointments.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        });
  }
 
});

export default appointmentSlice.reducer