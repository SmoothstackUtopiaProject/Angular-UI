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

  airportList: Airport[] =[];
  title = 'modal2';
  editProfileForm!: FormGroup;

  constructor(private airportService: AirportsService, private fb: FormBuilder, private modalService: NgbModal) { }


  ngOnInit() {
    this.getAllAirports();
    this.editProfileForm = this.fb.group({
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
   
    this.editProfileForm.patchValue({
      airportIataId: airport.airportIataId,
      airportName: airport.airportName,
      airportCityName: airport.airportCityName
    });
   }

   onSubmit() {
    // this.modalService.dismissAll();
    console.log("res:", this.editProfileForm.getRawValue());
   }
}
