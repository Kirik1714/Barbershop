import {
  createReservationRequest,
  makeAnAppointmentRequest,
  removeReservationRequest,
} from "@/shared/api/services";
import {
  CreateReservationAPI,
  Order,
  RemoveReservationAPI,
  ReservationPayload,
  
} from "@/types/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction ,nanoid} from "@reduxjs/toolkit";
import { RootState } from "../store";

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
const saveBasketToStorage = async (basket: Order[]) => {
  try {
    await AsyncStorage.setItem("basket", JSON.stringify(basket));
  } catch (e) {
    console.error("Failed to save basket to storage", e);
  }
};
export const loadBasketFromStorage = createAsyncThunk(
  "basket/load",
  async () => {
    const data = await AsyncStorage.getItem("basket");
    return data ? JSON.parse(data) : [];
  }
);

export const reserveAndAcceptOrder = createAsyncThunk(
  "cart/reserveAndAccept",
  async (payload: ReservationPayload, { dispatch, rejectWithValue }) => {
    
    const userToken = await AsyncStorage.getItem("token");

    if (!userToken) {
        return rejectWithValue("Пользователь не авторизован. Не удалось получить токен.");
    }

    try {
      const apiPayload: CreateReservationAPI = {
        masterId: payload.masterId,
        serviceId: payload.id, 
        date: payload.date,
        time: payload.time,
      };

      await createReservationRequest(apiPayload, userToken);
      
      const uniqueBasketItemId = nanoid();
      const newBasketItem: Order = {
        ...payload,
        basketItemId: uniqueBasketItemId,
      };
      dispatch(CartSlices.actions._acceptOrder(newBasketItem));
      
    } catch (error: any) {
      let errorMessage = "Ошибка сети или неизвестная ошибка.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const unreserveAndRemoveOrder = createAsyncThunk(
  "cart/unreserveAndRemove",
  async (payload: Order, { dispatch, rejectWithValue }) => {
    
    const userToken = await AsyncStorage.getItem("token");

    if (!userToken) {
        return rejectWithValue("Для удаления из корзины требуется авторизация.");
    }

    try {
      const apiPayload: RemoveReservationAPI = {
        masterId: payload.masterId,
        date: payload.date,
        time: payload.time,
      };


      await removeReservationRequest(apiPayload, userToken);
      
      dispatch(CartSlices.actions._removeFromBasket(payload.basketItemId)); 
      
    } catch (error: any) {
      let errorMessage = error.response?.data?.message || error.message || "Ошибка удаления резерва.";
      return rejectWithValue(errorMessage);
    }
  }
);
export const makeAnAppointment = createAsyncThunk("cart/makeAnAppointment",async(_,{getState,dispatch,rejectWithValue})=>{
  try {
    const state =getState() as RootState;
  const items = state.basket.basket;
    const userToken = await AsyncStorage.getItem('token');
    if (!userToken) return rejectWithValue("Авторизуйтесь для оформления");
    if (items.length === 0) return rejectWithValue("Корзина пуста");

    await makeAnAppointmentRequest(items,userToken);
    console.log('_____---3')
    dispatch(CartSlices.actions._clearBasket());

  } catch (error:any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка оформления");
  }

})

const CartSlices = createSlice({
  name: "cartSlices",
  initialState,
  reducers: {
    _acceptOrder(state, action: PayloadAction<Order>) {
      state.basket = [...state.basket, action.payload];
      saveBasketToStorage(state.basket);
    },
    _removeFromBasket(state, action: PayloadAction<string>) {
      
      state.basket = state.basket.filter(
        (item) => item.basketItemId !== action.payload
      );
      saveBasketToStorage(state.basket);
    },
    _clearBasket(state) {
      state.basket = [];
      AsyncStorage.removeItem("basket");
    },
    loadBasket(state, action: PayloadAction<Order[]>) {
      state.basket = action.payload;
      saveBasketToStorage(state.basket);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadBasketFromStorage.fulfilled,
      (state, action: PayloadAction<Order[]>) => {
        state.basket = action.payload;
      }
    );

    // Добавляем обработку состояния загрузки и ошибок для Thunks
    builder.addCase(reserveAndAcceptOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(reserveAndAcceptOrder.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(reserveAndAcceptOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Reservation failed";
    });
    // Оформление заказа 
    builder.addCase(makeAnAppointment.pending,(state)=>{
      state.loading = true;
      state.error = null;
    });
     builder.addCase(makeAnAppointment.fulfilled,(state)=>{
      state.loading = false;
    });
      builder.addCase(makeAnAppointment.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { loadBasket } = CartSlices.actions;
export default CartSlices.reducer;
