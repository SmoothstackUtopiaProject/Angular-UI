import { Role } from "./role";

export class User {
    userId!: number;
    userFirstName!: string;
    userLastName!: string;
    userEmail!: string;
    userPassword!: string;
    userPhone!: string;
    userRole!: Role;
    userToken!: string;
}