import { CreateReservationAPI, RemoveReservationAPI,  } from "@/types/services";
import axios from "axios";
const API_URL = "http://10.0.2.2:3000";



export const getAllServicesRequest = async () => {
  return axios
    .get(`${API_URL}/services/`)
    .then((res) => {

        
      return res;
    })
    .catch((err) => {
      console.log("Ошибка запроса:", err.message, err.response?.data);
      throw err;
    });
};

export const createReservationRequest = async (
    payload: CreateReservationAPI,
    token: string 
) => {
    if (!token) {
        throw new Error("Authentication token is missing.");
    }
    
    return axios
        .post(`${API_URL}/services/reserve`, payload, {
            // 💡 ГЛАВНОЕ ИСПРАВЛЕНИЕ: Передаем токен в заголовке Authorization
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then((res) => {
            return res.data; 
        })
        .catch((err) => {
            console.error("Ошибка создания резерва:", err.message, err.response?.data);
            throw err.response?.data || { message: "Failed to reserve slot." };
        });
};

export const removeReservationRequest = async (
    payload: RemoveReservationAPI, 
    token: string // 🛑 ОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР
) => {
    if (!token) {
        throw new Error("Authentication token is missing.");
    }
    
    return axios
        // 💡 Маршрут для удаления, используем 'post' или 'delete'
        // В вашем случае router.post('/unreserve') предполагает POST
        .post(`${API_URL}/services/unreserve`, payload, {
            headers: {
                'Authorization': `Bearer ${token}` // 🛑 ПЕРЕДАЧА ТОКЕНА
            }
        })
        .then((res) => {
            return res.data; 
        })
        .catch((err) => {
            console.error("Ошибка удаления резерва:", err.message, err.response?.data);
            throw err.response?.data || { message: "Failed to unreserve slot." };
        });
};