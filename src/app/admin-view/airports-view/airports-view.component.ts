import { Component, OnInit, ElementRef, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective} from 'ng-uikit-pro-standard';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Airport } from 'src/app/model/airport';
import { AirportsService } from 'src/app/service/airports/airports.service';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-airports-view',
  templateUrl: './airports-view.component.html',
  styleUrls: ['./airports-view.component.css']
})
export class AirportsViewComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective;
  @ViewChild('row', { static: true }) row!: ElementRef;

  airport!: Airport;
  airportList: Airport[] =[];
  editFormAirport!: FormGroup;
  createFormAirport!: FormGroup;
  selected!: Airport;
  searchText!: string ;
  previous!: string;
  errorMessage = '';
  hideMenu!: string | null;
  page!: any;
  sorted = false;
  loading!: boolean;
  updateTable!: boolean;

  formData = {
    airportIataId: [''],
    airportName: [''],
    airportCityName: ['']
  };

  constructor(
    private airportService: AirportsService, 
    private fb: FormBuilder, 
    private modalService: NgbModal,
    private dashboard: DashboardComponent) { }

  @HostListener('input') oninput() {
    this.searchItems();
}

  ngOnInit() {
    this.getAllAirports();
    this.editFormAirport = this.fb.group(this.formData);
    this.createFormAirport = this.fb.group(this.formData);

  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous);
        this.airportList = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
        this.airportList = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev);
    }
}

returnToDashboard(){
  this.dashboard.returnToDashboard();
}

  getAllAirports(){
    this.loading = true;
    this.airportService.getAllAirports().subscribe(
      response => {
        this.loading = false;
        this.mdbTable.setDataSource(response);
        this.airportList = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }, err =>{
        console.log(err);
      }
    )
  }

  refreshTable(){
    this.updateTable = true
    this.airportService.getAllAirports().subscribe(
      response => {
        this.loading = false;
        this.mdbTable.setDataSource(response);
        this.airportList = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      }, err =>{
        console.log(err);
      }
    )
  }

  sortBy(by: string | any): void {
    console.log(this.airportList)

    this.airportList.sort((a: any, b: any) => {
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
  
    this.selected = airport;
  }

  onSubmitCreate(){
    this.airportService.createAirport(this.createFormAirport.getRawValue()).subscribe(
      data=>{
        this.modalService.dismissAll();
        this.createFormAirport.reset();
        this.refreshTable()
      }, error => {
        this.errorMessage = error.error;
      }
    )
  }



  onSubmitUpdate() {
    this.airportService.updateAirport(this.editFormAirport.getRawValue()).subscribe(
      data=>{
        this.modalService.dismissAll();
        this.editFormAirport.reset();
        this.refreshTable()
      }, error => {
        this.errorMessage = error.error;
      }
    )
  }
  
  onSubmitDelete() {
    this.airportService.deleteAirport(this.selected).subscribe(
      data=>{
        this.modalService.dismissAll();
        this.refreshTable()
      }, error => {
        this.errorMessage = error.error;
      }
    )
  }
}
