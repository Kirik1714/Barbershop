import { configureStore } from "@reduxjs/toolkit";
import ServicesSlice from "./slices/ServicesSlice";
import MastersSlices from "./slices/MastersSlices";


export const store = configureStore({
  reducer: {
    services: ServicesSlice,
    masters:MastersSlices
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;