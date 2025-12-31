import { cancelAppointmentRequest, getMyAppointmentsRequest } from "@/shared/api/appointment";
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
export const cancelAppointment = createAsyncThunk(
    "appointments/cancelAppointment", async(id:number,thunkAPI)=>{
      try {
        await cancelAppointmentRequest(id)
        return id;
      } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Ошибка при удалении услуги");
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
    //cancelAppointment
    builder.addCase(cancelAppointment.fulfilled,(state,action)=>{
      const appointment = state.appointments.find((item)=> Number(item.id) ===Number(action.payload));
      if(appointment){
        appointment.status = 'cancelled'
      }
      
    })

  }
 
});

export default appointmentSlice.reducer