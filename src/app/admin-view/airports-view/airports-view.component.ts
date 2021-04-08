import { Component, OnInit } from '@angular/core';
import { Airport } from 'src/app/model/airport';
import { AirportsService } from 'src/app/service/airports/airports.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-airports-view',
  templateUrl: './airports-view.component.html',
  styleUrls: ['./airports-view.component.css']
})
export class AirportsViewComponent implements OnInit {

  airport!: Airport;
  airportList: Airport[] =[];
  editFormAirport!: FormGroup;
  createFormAirport!: FormGroup;

  constructor(private airportService: AirportsService, private fb: FormBuilder, private modalService: NgbModal) { }


  ngOnInit() {
    this.getAllAirports();
    this.editFormAirport = this.fb.group({
      airportIataId: [''],
      airportName: [''],
      airportCityName: ['']
    });
    this.createFormAirport = this.fb.group({
      airportIataId: [''],
      airportName: [''],
      airportCityName: ['']
    });

  }


  getAllAirports(){
    this.airportService.getAllAirports().subscribe(
      response => {
        this.airportList = response;
        console.log(response)
        return response;
      }
    )
  }

  openModal(targetModal:any, airport:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.editFormAirport.patchValue({
      airportIataId: airport.airportIataId,
      airportName: airport.airportName,
      airportCityName: airport.airportCityName
    });

    this.createFormAirport.patchValue({
      airportIataId: airport.airportIataId,
      airportName: airport.airportName,
      airportCityName: airport.airportCityName
    });
   }

   onSubmitUpdate() {
    this.modalService.dismissAll();
    console.log("res:", this.editFormAirport.getRawValue());
   }

   onSubmitCreate(){
    this.airportService.createAirport(this.createFormAirport.getRawValue()).subscribe(
      data=>{
        this.getAllAirports();
        this.modalService.dismissAll();
        this.createFormAirport.reset();
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
   }
}
