export interface Service{
    id: number;
    title: string;
    price: number;
    durationMinutes: string;
    photoUrl: string;
}
export interface Order {
  masterName: string;
  serviceName: string;
  date: string;
  time: string;
  servicePrice: number;
}