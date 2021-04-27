import { FlightsService } from './../../service/flights/flights.service';
import { Flight } from './../../model/flight';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flights-view',
  templateUrl: './flights-view.component.html',
  styleUrls: ['./flights-view.component.css']
})
export class FlightsViewComponent implements OnInit {

  flight!: Flight;
  flightList: Flight[] = [];
  editFormFlight!: FormGroup;
  createFormFlight!: FormGroup;
  selectedDelete!: Flight;
  page: number = 1;
  key: string = 'flightId';
  reverse: boolean = false;
  loading!: boolean;

  constructor(private flightsService: FlightsService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllFlights();
    this.editFormFlight = this.fb.group({
      flightId: [''],
      flightTypeId: ['']
    });
    this.createFormFlight = this.fb.group({
      flightId: [''],
      flightTypeId: 1
    });
  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getAllFlights(){
    this.loading = true;
    this.flightsService.getAllFlights().subscribe(
      response => {
        this.flightList = response;
        this.loading = false;
        console.log(response);
        return response;
      }
    )
  }

  //TODO - GENERALIZE openModal
  openCreateModal(targetModal:any, flight:any) {
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
   
    this.editFormFlight.patchValue({
      flightId: flight.flightId,
      flightTypeId: flight.flightTypeId
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
  this.flightsService.createFlight(this.createFormFlight.getRawValue()).subscribe(
    data=>{
      this.getAllFlights();
      this.modalService.dismissAll();
      this.createFormFlight.reset();
      console.log(data)
    }, error => {
      console.log(error)
    }
  )
  }

  onSubmitUpdate() {
  this.flightsService.updateFlight(this.editFormFlight.getRawValue()).subscribe(
    data=>{
      this.getAllFlights();
      this.modalService.dismissAll();
      this.editFormFlight.reset();
      console.log(data)
    }, error => {
      console.log(error)
    }
  )
  }

  onSubmitDelete() {
  this.flightsService.deleteFlight(this.selectedDelete).subscribe(
    data=>{
      this.getAllFlights();
      this.modalService.dismissAll();
      console.log(data)
    }, error => {
      console.log(error)
    }
  )
  } 

}
