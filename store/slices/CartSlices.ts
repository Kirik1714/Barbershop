import {
  createReservationRequest,
  removeReservationRequest,
} from "@/shared/api/services";
import {
  CreateReservationAPI,
  Order,
  RemoveReservationAPI,
  ReservationPayload,
  
} from "@/types/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

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
    
    // 1. АСИНХРОННО ИЗВЛЕКАЕМ ТОКЕН
    const userToken = await AsyncStorage.getItem("token");

    if (!userToken) {
        return rejectWithValue("Для удаления из корзины требуется авторизация.");
    }

    try {
      // 2. ФОРМИРУЕМ PAYLOAD ИЗ ДАННЫХ КОРЗИНЫ (Order)
      const apiPayload: RemoveReservationAPI = {
        masterId: payload.masterId,
        date: payload.date,
        time: payload.time,
      };

      // 3. ВЫЗЫВАЕМ API-функцию, ПЕРЕДАВАЯ токен
      await removeReservationRequest(apiPayload, userToken);
      
      // 4. Успешное удаление из Redux-корзины
      dispatch(CartSlices.actions._removeFromBasket(payload.basketItemId)); 
      
    } catch (error: any) {
      let errorMessage = error.response?.data?.message || error.message || "Ошибка удаления резерва.";
      return rejectWithValue(errorMessage);
    }
  }
);

const CartSlices = createSlice({
  name: "cartSlices",
  initialState,
  reducers: {
    _acceptOrder(state, action: PayloadAction<Order>) {
      // Принимает готовый объект Order с basketItemId
      state.basket = [...state.basket, action.payload];
      saveBasketToStorage(state.basket);
    },
    _removeFromBasket(state, action: PayloadAction<string>) {
      
      state.basket = state.basket.filter(
        (item) => item.basketItemId !== action.payload
      );
      saveBasketToStorage(state.basket);
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

    // 💡 Добавляем обработку состояния загрузки и ошибок для Thunks
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
  },
});

export const { loadBasket } = CartSlices.actions;
export default CartSlices.reducer;
