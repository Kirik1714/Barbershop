import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  masterName: string;
  serviceName: string;
  date: string;
  time: string;
}

interface cartState {
  loading: boolean;
  basket: Order[];
  error: string | null;
}

const initialState: cartState = {
  loading: false,
  basket: [],
  error: null,
};

const CartSlices = createSlice({
  name: "cartSlices",
  initialState,
  reducers: {
    acceptOrder(state,action:PayloadAction<Order>){
        state.basket=[...state.basket,action.payload]
    }
  },
});


export const {acceptOrder}=CartSlices.actions
export default CartSlices.reducer

