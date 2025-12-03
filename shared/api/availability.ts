import axios from "axios";

const API_URL = "http://10.0.2.2:3000";

export const getAvailabilityRequest = async (serviceId:number,masterId: number, date: string) => {
  
  try {
    const res = await axios.get(
      `${API_URL}/services/${serviceId}/availability?masterId=${masterId}&date=${date}`
    );
   
    
    
    return res.data; 
  } catch (err: any) {
    console.log("Ошибка запроса availability:", err.message, err.response?.data);
    throw err;
  }
};
