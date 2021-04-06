import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_URL = "http://localhost:8083/auth";

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { 
  }

  login(userEmail: string, userPassword: string) {

    let basicAuthHeaderString = 'Basic ' + btoa(userEmail + ':' + userPassword);

    let headers = new HttpHeaders({ 
      Authorization: basicAuthHeaderString
    });

    return this.http.get<User>(`${API_URL}/login`, {headers})
    .pipe(
      map(
        data=>{
          sessionStorage.setItem(AUTHENTICATED_USER, data.userFirstName);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    )
  }
  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser()){
      return sessionStorage.getItem(TOKEN)
    } else return null;
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

}

