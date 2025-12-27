import axios from "axios";
import { RegisterPayload, LoginPayload } from "../../types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:3000";

export const registerRequest = async (data: RegisterPayload) => {
  return axios
    .post(`${API_URL}/users/registration`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Ошибка запроса:", err.message, err.response?.data);
      throw err;
    });
};

export const loginRequest = async (data: LoginPayload) => {
  return axios
    .post(`${API_URL}/users/login`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Ошибка запроса:", err.message, err.response?.data);
      throw err;
    });
};


export const checkAuthRequest = async()=>{
  try {
    const token = await AsyncStorage.getItem("token"); 
    const res= await axios.get(`${API_URL}/users/me`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return res;
  } catch (error :any) {
    console.log("Ошибка запроса checkAuthRequest:", error.message, error.response?.data);
    throw error;
  }
}