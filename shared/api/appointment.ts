import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const API_URL = "http://10.0.2.2:3000";


export const getMyAppointmentsRequest =async()=>{
    try {
    const token = await AsyncStorage.getItem("token"); 
    const res = await axios.get(`${API_URL}/users/myAppointment`,{
          headers:{
                 Authorization:`Bearer ${token}`

          }
        })
        
        
    return res.data;

    } catch (error:any) {
        console.log("Ошибка запроса getMyAppointmentsRequest:", error.message, error.response?.data);
    throw error;
         
    }
}

export const cancelAppointmentRequest=async(id:number)=>{
    try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.patch(`${API_URL}/users/appointment/${id}/cancel`,{},
            {
                
                headers:{
                     Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data
    } catch (error:any) {
        console.log("Ошибка запроса cancelAppointmentRequest:", error.message, error.response?.data);
    throw error;
    }
}