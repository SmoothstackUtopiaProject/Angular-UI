import { AirplanesService } from './../../service/airplanes/airplanes.service';
import { Airplane } from './../../model/airplane';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-airplanes-view',
  templateUrl: './airplanes-view.component.html',
  styleUrls: ['./airplanes-view.component.css']
})
export class AirplanesViewComponent implements OnInit {

  airplane!: Airplane;
  airplaneList: Airplane[] = [];
  editFormAirplane!: FormGroup;
  createFormAirplane!: FormGroup;
  selectedDelete!: Airplane;
  currentSort = "up";
  sortedItem = "";

  constructor(private airplanesService: AirplanesService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllAirplanes();
    this.editFormAirplane = this.fb.group({
      airplaneId: [''],
      airplaneTypeId: ['']
    });
    this.createFormAirplane = this.fb.group({
      airplaneId: [''],
      airplaneTypeId: 1
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
    let airplaneSorted = this.airplaneList;

    switch(this.sortedItem) {
      case "airplaneId":
        airplaneSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.airplaneId - b.airplaneId
            : b.airplaneId - a.airplaneId
        });
      break;

      case "airplaneTypeId":
        airplaneSorted.sort((a,b) => {
          return this.currentSort === "up"
            ? a.airplaneTypeId - b.airplaneTypeId
            : b.airplaneTypeId - a.airplaneTypeId
        });
      break;
    }

    this.airplaneList = airplaneSorted;
  }

  getAllAirplanes(){
    this.airplanesService.getAllAirplanes().subscribe(
      response => {
        this.airplaneList = response;
        console.log(response)
        return response;
      }
    )
  }

  //TODO - GENERALIZE openModal
  openCreateModal(targetModal:any, airplane:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   }

  openEditModal(targetModal:any, airplane:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
  });
   
    this.editFormAirplane.patchValue({
      airplaneId: airplane.airplaneId,
      airplaneTypeId: airplane.airplaneTypeId
    });
  }

  openDeleteModal(targetModal:any, airplane:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });

    this.selectedDelete = airplane;
  }

  onSubmitCreate(){
  this.airplanesService.createAirplane(this.createFormAirplane.getRawValue()).subscribe(
    data=>{
      this.getAllAirplanes();
      this.modalService.dismissAll();
      this.createFormAirplane.reset();
      console.log(data)
    }, error => {
      console.log(error)
    }
  )
  }

  onSubmitUpdate() {
  this.airplanesService.updateAirplane(this.editFormAirplane.getRawValue()).subscribe(
    data=>{
      this.getAllAirplanes();
      this.modalService.dismissAll();
      this.editFormAirplane.reset();
      console.log(data)
    }, error => {
      console.log(error)
    }
  )
  }

  onSubmitDelete() {
  this.airplanesService.deleteAirplane(this.selectedDelete).subscribe(
    data=>{
      this.getAllAirplanes();
      this.modalService.dismissAll();
      console.log(data)
    }, error => {
      console.log(error)
    }
  )
  } 

}
