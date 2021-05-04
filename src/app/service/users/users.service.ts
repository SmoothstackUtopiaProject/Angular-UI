import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get<User[]>(environment.usersEndpoint)
  }

  createUser(user: User){
    return this.http.post<User>(environment.authEndpoint, user)
  }

  updateUser(user: User){
    return this.http.put<User>(environment.usersEndpoint, user)
  }

  deleteUser(user: User){
    return this.http.delete(environment.authEndpoint + "/" + user.userId)
  }

}

