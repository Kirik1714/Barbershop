import {
  CreateReservationAPI,
  Order,
  RemoveReservationAPI,
} from "@/types/services";
import axios from "axios";
const API_URL = "http://10.0.2.2:3000";

export const getAllServicesRequest = async (limit:number,page:number,search:string="") => {
  return axios
    .get(`${API_URL}/services/?limit=${limit}&page=${page}&search=${search}`)
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(
        "Ошибка создания резерва:",
        err.message,
        err.response?.data
      );
      throw err.response?.data || { message: "Failed to reserve slot." };
    });
};

export const removeReservationRequest = async (
  payload: RemoveReservationAPI,
  token: string
) => {
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  return axios

    .post(`${API_URL}/services/unreserve`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(
        "Ошибка удаления резерва:",
        err.message,
        err.response?.data
      );
      throw err.response?.data || { message: "Failed to unreserve slot." };
    });
};

export const makeAnAppointmentRequest = async (
  items: Order[],
  token: string
) => {
  console.log("makeAnAppointmentRequest");

  return axios.post(
    `${API_URL}/orders/makeOrder`,
    { items },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
