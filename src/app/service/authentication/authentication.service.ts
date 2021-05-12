import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

    return this.http.get<User>(`${environment.authEndpoint}/login`, {headers})
    .pipe(
      map(
        data=>{
          localStorage.setItem(AUTHENTICATED_USER, data.userFirstName);
          localStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    )
  }
  getAuthenticatedUser() {
    return localStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser()){
      return localStorage.getItem(TOKEN)
    } else return null;
  }
  isUserLoggedIn() {
    let user = localStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    localStorage.removeItem(AUTHENTICATED_USER)
    localStorage.removeItem(TOKEN)
  }

}

