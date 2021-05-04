import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from './../../model/flight';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { }

  getAllFlights() : Observable<any>{
    return this.http.get<Flight[]>(environment.flightsEndpoint)
  }

  createFlight(flight: Flight){
    return this.http.post<Flight>(environment.flightsEndpoint, flight)
  }

  updateFlight(flight: Flight){
    return this.http.put<Flight>(environment.flightsEndpoint, flight)
  }

  deleteFlight(flight: Flight){
    return this.http.delete(environment.flightsEndpoint + "/" + flight.flightId)
  }
}
