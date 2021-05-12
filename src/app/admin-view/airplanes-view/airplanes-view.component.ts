import { Component, OnInit, ElementRef, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective} from 'ng-uikit-pro-standard';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AirplanesService } from './../../service/airplanes/airplanes.service';
import { Airplane } from './../../model/airplane';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';


@Component({
  selector: 'app-airplanes-view',
  templateUrl: './airplanes-view.component.html',
  styleUrls: ['./airplanes-view.component.css']
})
export class AirplanesViewComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective;
  @ViewChild('row', { static: true }) row!: ElementRef;

  airplane!: Airplane;
  airplaneList: Airplane[] = [];
  editFormAirplane!: FormGroup;
  createFormAirplane!: FormGroup;
  selected!: Airplane;
  searchText!: string ;
  previous!: string;
  errorMessage = '';
  hideMenu!: string | null;
  page!: any;
  sorted = false;
  loading!: boolean;
  updateTable!: boolean;

  formData = {
    airplaneId: [''],
    airplaneTypeId: ['']
  };


  constructor(
    private airplanesService: AirplanesService, 
    private fb: FormBuilder, 
    private modalService: NgbModal,
    private dashboard: DashboardComponent) { }

    @HostListener('input') oninput() {
      this.getAllAirplanes();
  }

  ngOnInit(): void {
    this.getAllAirplanes();
    this.editFormAirplane = this.fb.group(this.formData);
    this.createFormAirplane = this.fb.group(this.formData);
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous);
        this.airplaneList = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
        this.airplaneList = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev);
    }
}

returnToDashboard(){
  this.dashboard.returnToDashboard();
}


  getAllAirplanes(){
    this.loading = true;
    this.airplanesService.getAllAirplanes().subscribe(
      response => {
        console.log(response);
        this.loading = false;
        this.mdbTable.setDataSource(response);
        this.airplaneList = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }, err =>{
        console.log(err);
      }
    )
  }

  refreshTable(){
    this.updateTable = true
    this.airplanesService.getbyId().subscribe(
      response => {
        this.loading = false;
        this.mdbTable.setDataSource(response);
        this.airplaneList = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }, err =>{
        console.log(err);
      }
    )
  }

  sortBy(by: string | any): void {
    console.log(this.airplaneList)

    this.airplaneList.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }


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

    this.selected = airplane;
  }

  onSubmitCreate(){
  this.airplanesService.createAirplane(this.createFormAirplane.getRawValue()).subscribe(
    data=>{
      this.modalService.dismissAll();
      this.createFormAirplane.reset();
      this.refreshTable()
    }, error => {
      console.log(error.error)
      this.errorMessage = error.error.error;
    }
  )
  }

  onSubmitUpdate() {
  this.airplanesService.updateAirplane(this.editFormAirplane.getRawValue()).subscribe(
    data=>{
      this.modalService.dismissAll();
      this.editFormAirplane.reset();
      this.refreshTable()
    }, error => {
      this.errorMessage = error.error.error;
    }
  )
  }

  onSubmitDelete() {
  this.airplanesService.deleteAirplane(this.selected).subscribe(
    data=>{
      this.getAllAirplanes();
      this.modalService.dismissAll();
      console.log(data)
    }, error => {
      this.errorMessage = error.error.error;
    }
  )
  } 

}
