import { configureStore } from "@reduxjs/toolkit";
import ServicesSlice from "./slices/ServicesSlice";
import MastersSlices from "./slices/MastersSlices";
import AuthSlices from './slices/AuthSlices'


export const store = configureStore({
  reducer: {
    services: ServicesSlice,
    masters:MastersSlices,
    auth:AuthSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;