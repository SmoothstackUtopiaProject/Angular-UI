import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from 'src/app/model/route';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http: HttpClient) { }

  getAllRoutes(){
    return this.http.get<Route[]>(environment.routesEndpoint)
  }
  
  createRoute(route: Route){
    return this.http.post<Route>(environment.routesEndpoint, route)
  }

  updateRoute(route: Route){
    return this.http.put<Route>(environment.routesEndpoint, route)
  }

  deleteRoute(route: Route){
    return this.http.delete(environment.routesEndpoint + "/" + route.routeId)
  }
}



