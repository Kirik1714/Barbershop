import axios from "axios";
const API_URL = "http://10.0.2.2:3000";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllMasterRequest = async () => {
  return axios
    .get(`${API_URL}/users/`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Ошибка запроса:", err.message, err.response?.data);
      throw err;
    });
};

export const getScheduleByMasterRequest = async (
  masterId: string,
  month: string
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(`${API_URL}/users/schedule/${masterId}`, {
      params: { month },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(
      "Ошибка запроса: при получении расписании",
      error.message,
      error.response?.data
    );
    throw error;
  }
};
