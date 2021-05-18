import { Role } from './role';

export interface User {
  userId: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  userRole: Role;
  userToken: string;
}

export interface CreateUser {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  userRole: Role;
}
