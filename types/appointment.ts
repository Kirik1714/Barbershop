export interface IAppointment{
    id:string;
    date:string;
    time:string;
    status:string;
    price:number;
    master:{
        name:string;
        photoUrl:string |null;
    };
    service:{
        title:string;
        price:number;
    }
}