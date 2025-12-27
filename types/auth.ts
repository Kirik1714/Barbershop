export type Role = 'USER' | 'MASTER';
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: number;
  token: string;
  message: string;
}

export interface IUser{
  id:number,
  email:string | number,
  name:string | number,
  role: Role;        
  photoUrl: string | null;
  createdAt: string;

}