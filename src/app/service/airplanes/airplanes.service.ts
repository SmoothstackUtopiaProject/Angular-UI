import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airplane } from 'src/app/model/airplane';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirplanesService {

  constructor(private http: HttpClient) { }

  getAllAirplanes(){
    return this.http.get<Airplane[]>(environment.airplanesEndpoint)
  }

  createAirplane(airplane: Airplane){
    return this.http.post<Airplane>(environment.airplanesEndpoint, airplane)
  }

  updateAirplane(airplane: Airplane){
    return this.http.post<Airplane>(environment.airplanesEndpoint, airplane)
  }

  deleteAirplane(airplane: Airplane){
    return this.http.delete(environment.airplanesEndpoint + "/" + airplane.airplaneId)
  }
}
