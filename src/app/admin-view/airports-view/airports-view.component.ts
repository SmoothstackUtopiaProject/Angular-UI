import { Component, OnInit } from '@angular/core';
import { Airport } from 'src/app/model/airport';
import { AirportsService } from 'src/app/service/airports/airports.service';

@Component({
  selector: 'app-airports-view',
  templateUrl: './airports-view.component.html',
  styleUrls: ['./airports-view.component.css']
})
export class AirportsViewComponent implements OnInit {

  airportList: Airport[] =[];

  constructor(private airportService: AirportsService) { }


  ngOnInit() {
    this.getAllAirports();
  
  }


  getAllAirports(){
    this.airportService.getAllAirports().subscribe(
      response => {
        this.airportList = response;
        return response;
      }
    )
  }



}
