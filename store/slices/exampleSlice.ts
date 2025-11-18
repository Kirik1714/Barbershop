import { Service } from "@/types/services";
import { createSlice } from "@reduxjs/toolkit";

const DATA=[
  {
    "id": 1,
    "name": "Мужская стрижка",
    "price": 100,
    "time": "30 мин - 60 мин",
    "image": "male.png"
  },
  {
    "id": 2,
    "name": "Женская стрижка",
    "price": 150,
    "time": "45 мин - 90 мин",
    "image": "female.png"
  },
  {
    "id": 3,
    "name": "Детская стрижка",
    "price": 70,
    "time": "20 мин - 40 мин",
    "image": "child.png"
  },
  {
    "id": 4,
    "name": "Бритьё бороды",
    "price": 50,
    "time": "20 мин - 30 мин",
    "image": "beard.png"
  },
  {
    "id": 5,
    "name": "Укладка волос",
    "price": 40,
    "time": "15 мин - 30 мин",
    "image": "style.png"
  }
]



interface ExampleState {
  count: number;
  DATA:Service[],
}


const initialState: ExampleState = {
  count: 0,
  DATA:DATA,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    setCount(state, action) {
      state.count = action.payload;
    },
  },
});

export const { increment, decrement, setCount } = exampleSlice.actions;
export default exampleSlice.reducer;
