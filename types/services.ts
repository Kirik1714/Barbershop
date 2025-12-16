export interface Service{
    id: number;
    title: string;
    price: number;
    durationMinutes: string;
    photoUrl: string;
}
export interface Order {
  id: number,
  masterName: string;
  serviceName: string;
  date: string;
  time: string;
  servicePrice: number;
  basketItemId:string,
    masterId: number;



}
export interface ReservationPayload {
    id: number; 
    masterId: number;
    masterName: string;
    serviceName: string;
    date: string;
    time: string;
    servicePrice: number;
}
export interface CreateReservationAPI {
    masterId: number;
    serviceId: number; //
    date: string;
    time: string;
}
export interface RemoveReservationAPI {
    masterId: number;
    date: string;
    time: string;
}