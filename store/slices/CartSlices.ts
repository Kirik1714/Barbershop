import { Order } from "@/types/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



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

export const loadBasketFromStorage = createAsyncThunk(
  "basket/load",
  async () => {
  const data = await AsyncStorage.getItem("basket");
    return data ? JSON.parse(data) : [];
  }
);
const saveBasketToStorage = async (basket: Order[]) => {
  try {
    await AsyncStorage.setItem("basket", JSON.stringify(basket));
  } catch (e) {
    console.error("Failed to save basket to storage", e);
  }
};

const CartSlices = createSlice({
  name: "cartSlices",
  initialState,
  reducers: {
    acceptOrder(state, action: PayloadAction<Order>) {
      state.basket = [...state.basket, action.payload];
      saveBasketToStorage(state.basket);
    },
    loadBasket(state, action: PayloadAction<Order[]>) {
      state.basket = action.payload;
      saveBasketToStorage(state.basket);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBasketFromStorage.fulfilled, (state, action) => {
      state.basket = action.payload;
    });
  },
});

export const { acceptOrder, loadBasket } = CartSlices.actions;
export default CartSlices.reducer;
