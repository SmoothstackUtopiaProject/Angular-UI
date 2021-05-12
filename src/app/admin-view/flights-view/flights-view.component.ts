import { FlightsService } from './../../service/flights/flights.service';
import { Flight } from './../../model/flight';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-flights-view',
  templateUrl: './flights-view.component.html',
  styleUrls: ['./flights-view.component.css']
})
export class FlightsViewComponent implements OnInit {

  flight!: Flight;
  flightList: Flight[] = [];
  flightListSaved: Flight[] = [];
  editFormFlight!: FormGroup;
  createFormFlight!: FormGroup;
  selectedDelete!: Flight;
  hours = 0;
  minutes = 0;
  duration = this.hours * this.minutes;
  page: number = 1;
  currentSort = "up";
  sortedItem = "";
  loading!: boolean;
  origin: any;
  

  constructor(private flightsService: FlightsService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllFlights();
    this.editFormFlight = this.fb.group({
      flightId: [''],
      flightRoute: 1,
      flightAirplane: 1,
      flightDepartureTime: [''],
      flightSeatingId: 1,
      flightDuration: this.hours * this.minutes,
      flightStatus: "INACTIVE"
    });
    this.createFormFlight = this.fb.group({
      flightRoute: 1,
      flightAirplane: 1,
      flightDepartureTime: [''],
      flightSeatingId: 1,
      flightDuration: this.hours * this.minutes,
      flightStatus: "INACTIVE"
    });
  }

  search(){
    if(this.origin == ""){
      this.flightList = this.flightListSaved;
    }else{
      this.flightList = this.flightList.filter(res => {
        return res.flightRoute.routeOrigin.airportCityName.toLowerCase().match(this.origin.toLowerCase());
      })
    }
  }

  onSortChange = (sortedItem : string) => {
    let nextSort;

    if(this.currentSort === "down") nextSort = "up";
    else nextSort = "down";

    this.currentSort = nextSort;
    this.sortedItem = sortedItem;
    this.sortList();
  }

  sortList() {
    let flightSorted = this.flightList;

    switch(this.sortedItem) {
      case "flightId":
        flightSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.flightId - b.flightId
            : b.flightId - a.flightId
        });
      break;

      case "airplaneId":
        flightSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.flightAirplane.airplaneId - b.flightAirplane.airplaneId
            : b.flightAirplane.airplaneId - a.flightAirplane.airplaneId
        });
      break;

      case "originCityName":
        flightSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.flightRoute.routeOrigin.airportCityName.localeCompare(b.flightRoute.routeOrigin.airportCityName)
            : b.flightRoute.routeOrigin.airportCityName.localeCompare(a.flightRoute.routeOrigin.airportCityName)
        });
      break;

      case "destinationCityName":
        flightSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.flightRoute.routeDestination.airportCityName.localeCompare(b.flightRoute.routeDestination.airportCityName)
            : b.flightRoute.routeDestination.airportCityName.localeCompare(a.flightRoute.routeDestination.airportCityName)
        });
      break;

      case "status":
        flightSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.flightStatus.localeCompare(b.flightStatus)
            : b.flightStatus.localeCompare(a.flightStatus)
        });
      break;
    }

    this.flightList = flightSorted;
  }

  getAllFlights(){
    this.loading = true;
    this.flightsService.getAllFlights().subscribe(
      response => {
        this.flightList = response;
        this.flightListSaved = response;
        this.loading = false;
        console.log(response);
        return response;
      }
    )
  }

  //TODO - GENERALIZE openModal
  openCreateModal(targetModal:any, flight:any) {
    this.createFormFlight.patchValue({flightDepartureTime: moment().format("YYYY-MM-DDTHH:mm")});
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   }

  openEditModal(targetModal:any, flight:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
  });
    this.hours = Math.floor(flight.flightDuration / 3600);
    this.minutes = Math.floor((flight.flightDuration % 3600) / 60);
    this.editFormFlight.patchValue({
      flightId: flight.flightId,
      flightRoute: flight.flightRoute.routeId,
      flightAirplane: flight.flightAirplane.airplaneId,
      flightDepartureTime: moment(flight.flightDepartureTime).format("YYYY-MM-DDTHH:mm").toString(),
      flightSeatingId: flight.flightSeatingId,
      flightStatus: flight.flightStatus
    });
  }

  openDeleteModal(targetModal:any, flight:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });

    this.selectedDelete = flight;
  }

  onSubmitCreate(){
  this.createFormFlight.patchValue({flightDuration: (this.hours * 3600) + (this.minutes * 60)});
  this.flightsService.createFlight(this.createFormFlight.getRawValue()).subscribe(
    data=>{
      this.getAllFlights();
      this.modalService.dismissAll();
      this.createFormFlight.reset();
      console.log(data);
    }, err => {
      this.getAllFlights();
      this.modalService.dismissAll();
      this.createFormFlight.reset();
      console.log(err);
    }
  )
  }

  onSubmitUpdate() {
  this.editFormFlight.patchValue({flightDuration: (this.hours * 3600) + (this.minutes * 60)});
  this.flightsService.updateFlight(this.editFormFlight.getRawValue()).subscribe(
    data=>{
      this.getAllFlights();
      this.modalService.dismissAll();
      this.editFormFlight.reset();
      console.log(data);
    }, error => {
      this.getAllFlights();
      this.modalService.dismissAll();
      this.editFormFlight.reset();
      console.log(error);
    }
  )
  }

  onSubmitDelete() {
    this.flightsService.deleteFlight(this.selectedDelete).subscribe(
    data=>{
      this.getAllFlights();
      this.modalService.dismissAll();
      console.log(data);
    }, err => {
      this.getAllFlights();
      this.modalService.dismissAll();
      console.log(err);
    }
  )
  } 

}
