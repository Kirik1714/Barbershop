import { registerRequest } from "@/shared/api/auth";
import { RegisterPayload } from "@/types/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: RegisterPayload, thunkAPI) => {
    try {
  
      
      const res = await registerRequest(data);
      await AsyncStorage.setItem("token", res.data.token);
 
      
      return res.data;
    } catch (error: any) {
        console.log("Ошибка запроса registerUser:", error);

      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const loadUserFromStorage = createAsyncThunk("auth/load", async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
});

interface AuthState {
  userId: number | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userId: null,
  token: null,
  loading: false,
  error: null,
};

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userId = null;
      AsyncStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(loadUserFromStorage.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});


export const {logout} = authSlices.actions;
export default authSlices.reducer;

