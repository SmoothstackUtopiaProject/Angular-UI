import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airport } from 'src/app/model/airport';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  constructor(private http: HttpClient) { }

  getAllAirports(){
    return this.http.get<Airport[]>(environment.airportsEndpoint)
  }
  createAirport(airport: Airport){
    return this.http.post<Airport>(environment.airportsEndpoint, airport)
  }
  
}
