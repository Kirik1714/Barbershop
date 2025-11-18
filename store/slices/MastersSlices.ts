import { Master } from "@/types/master";
import { createSlice } from "@reduxjs/toolkit";

const DATA:Master[]=[
  {
    "id": 1,
    "name": "Алексей",
    "specialisation": "Мужские стрижки",
    "image": "barber1.png"
  },
  {
    "id": 2,
    "name": "Марина",
    "specialisation": "Женские стрижки",
    "image": "barber2.png"
  },
  {
    "id": 3,
    "name": "Игорь",
    "specialisation": "Стрижка бороды",
    "image": "barber3.png"
  },
  {
    "id": 4,
    "name": "Светлана",
    "specialisation": "Окрашивание волос",
    "image": "barber4.png"
  },
  {
    "id": 5,
    "name": "Дмитрий",
    "specialisation": "Моделирование причесок",
    "image": "barber5.png"
  }
]


const initialState= {
  DATA:DATA,
  
};

const MastersSlices = createSlice({
  name: "masters",
  initialState,
  reducers: {
  },
});

// export const { } = ServicesSlice.actions;
export default MastersSlices.reducer;
