import {
  checkAuthRequest,
  loginRequest,
  registerRequest,
} from "@/shared/api/auth";
import { RegisterPayload, LoginPayload, IUser } from "@/types/auth";
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: LoginPayload, thunkAPI) => {
    try {
      const res = await loginRequest(data);
      await AsyncStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error: any) {
      console.log("Ошибка запроса registerUser:", error);

      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("NO TOKEN");
      const res = await checkAuthRequest();
      return { token, user: res.data };
    } catch (error: any) {
      await AsyncStorage.removeItem("token");
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);

interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  user: null,
};

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      AsyncStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    //regist
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //checkAuth

    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.loading = false;
      state.token = null;
      state.user = null;
    });
  },
});

export const { logout } = authSlices.actions;
export default authSlices.reducer;
