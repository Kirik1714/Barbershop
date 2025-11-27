import { configureStore } from "@reduxjs/toolkit";
import ServicesSlice from "./slices/ServicesSlice";
import MastersSlices from "./slices/MastersSlices";
import AuthSlices from './slices/AuthSlices'
import AsyncStorage from "@react-native-async-storage/async-storage";




export const store = configureStore({
  reducer: {
    services: ServicesSlice,
    masters:MastersSlices,
    auth:AuthSlices,
  },
   devTools: true, // <--- включаем Redux DevTools


});
store.subscribe(() => {
  const token = store.getState().auth.token;
  console.log('Current token:', token);

  console.log('Current token:', token);


});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;