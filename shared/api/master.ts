import axios from "axios";
const API_URL = "http://10.0.2.2:3000";

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
