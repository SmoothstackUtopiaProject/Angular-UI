import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService {

  constructor(private authService: AuthenticationService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler){

    let basicAuthHeaderString = this.authService.getAuthenticatedToken();
    let userEmail = this.authService.getAuthenticatedUser()

    if(basicAuthHeaderString && userEmail) { 
      request = request.clone({
        setHeaders : {
            Authorization : basicAuthHeaderString
          }
        }) 
    }
    return next.handle(request);
  }


}
