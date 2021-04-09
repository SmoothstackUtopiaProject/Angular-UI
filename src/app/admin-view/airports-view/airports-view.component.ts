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
  selectedDelete!: Airport;
  currentSort = "up";
  sortedItem = "";
  errorMessage!: '';
  loading!: boolean;

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

  onSortChange = (sortedItem : string) => {
    let nextSort;

    if(this.currentSort === "down") nextSort = "up";
    else nextSort = "down";

    this.currentSort = nextSort;
    this.sortedItem = sortedItem;
    this.sortList();
  }

  sortList() {
    let airportSorted = this.airportList;

    switch(this.sortedItem) {
      case "airportIataId":
        airportSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.airportIataId.localeCompare(b.airportIataId)
            : b.airportIataId.localeCompare(a.airportIataId)
        });
      break;

      case "airportName":
        airportSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.airportName.localeCompare(b.airportName)
            : b.airportName.localeCompare(a.airportName)
        });
      break;

      case "airportCityName":
        airportSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.airportCityName.localeCompare(b.airportCityName)
            : b.airportCityName.localeCompare(a.airportCityName)
        });
      break;
    }

    this.airportList = airportSorted;
  }


  getAllAirports(){
    this.loading = true;
    this.airportService.getAllAirports().subscribe(
      response => {
        this.airportList = response;
        this.loading = false;
        return response;
      }
    )
  }

  openCreateModal(targetModal:any, airport:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
  }

  openEditModal(targetModal:any, airport:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.editFormAirport.patchValue({
      airportIataId: airport.airportIataId,
      airportName: airport.airportName,
      airportCityName: airport.airportCityName
    });
  }

  openDeleteModal(targetModal:any, airport:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
  
    this.selectedDelete = airport;
  }

  onSubmitCreate(){
    this.airportService.createAirport(this.createFormAirport.getRawValue()).subscribe(
      data=>{
        this.getAllAirports();
        this.modalService.dismissAll();
        this.createFormAirport.reset();
        console.log(data)
      }, error => {
        console.log(error.error.error);
        this.errorMessage = error.error.error;
      }
    )
  }

  onSubmitUpdate() {
    this.airportService.updateAirport(this.editFormAirport.getRawValue()).subscribe(
      data=>{
        this.getAllAirports();
        this.modalService.dismissAll();
        this.editFormAirport.reset();
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }
  
  onSubmitDelete() {
    this.airportService.deleteAirport(this.selectedDelete).subscribe(
      data=>{
        this.getAllAirports();
        this.modalService.dismissAll();
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }
}
