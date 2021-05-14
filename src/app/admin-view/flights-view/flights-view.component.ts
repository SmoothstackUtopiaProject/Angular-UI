import { FlightsService } from './../../service/flights/flights.service';
import { Flight } from './../../model/flight';
import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MdbTableDirective } from 'ng-uikit-pro-standard';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import * as moment from 'moment';

@Component({
  selector: 'app-flights-view',
  templateUrl: './flights-view.component.html',
  styleUrls: ['./flights-view.component.css'],
})
export class FlightsViewComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective;
  @ViewChild('row', { static: true }) row!: ElementRef;

  flight!: Flight;
  flightList: Flight[] = [];
  editFormFlight!: FormGroup;
  createFormFlight!: FormGroup;
  selected!: Flight;
  searchText!: string;
  previous!: string;
  errorMessage = '';
  hideMenu!: string | null;
  page!: any;
  sorted = false;
  loading!: boolean;
  updateTable!: boolean;
  hours = 0;
  minutes = 0;

  formData = {
    flightId: [''],
    flightRoute: 1,
    flightAirplane: 1,
    flightDepartureTime: [''],
    flightSeatingId: 1,
    flightDuration: this.hours * this.minutes,
    flightStatus: 'INACTIVE',
  };

  constructor(
    private flightsService: FlightsService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private dashboard: DashboardComponent
  ) {}

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit(): void {
    this.getAllFlights();
    this.editFormFlight = this.fb.group(this.formData);
    this.createFormFlight = this.fb.group(this.formData);
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.flightList = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.flightList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  returnToDashboard() {
    this.dashboard.returnToDashboard();
  }

  getAllFlights() {
    this.loading = true;
    this.flightsService.getAllFlights().subscribe(
      (response) => {
        this.loading = false;
        this.mdbTable.setDataSource(response);
        this.flightList = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  refreshTable() {
    this.updateTable = true;
    this.flightsService.getAllFlights().subscribe(
      (response) => {
        this.updateTable = false;
        this.mdbTable.setDataSource(response);
        this.flightList = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sortBy(by: string | any): void {
    this.flightList.sort((a: Flight, b: Flight) => {
      switch (by) {
        case 'flightId':
          if (a.flightId < b.flightId) {
            return this.sorted ? 1 : -1;
          }
          if (a.flightId > b.flightId) {
            return this.sorted ? -1 : 1;
          }
          break;
        case 'airplaneId':
          if (a.flightAirplane.airplaneId < b.flightAirplane.airplaneId) {
            return this.sorted ? 1 : -1;
          }
          if (a.flightAirplane.airplaneId > b.flightAirplane.airplaneId) {
            return this.sorted ? -1 : 1;
          }
          break;
        case 'originCityName':
          if (
            a.flightRoute.routeOrigin.airportCityName <
            b.flightRoute.routeOrigin.airportCityName
          ) {
            return this.sorted ? 1 : -1;
          }
          if (
            a.flightRoute.routeOrigin.airportCityName >
            b.flightRoute.routeOrigin.airportCityName
          ) {
            return this.sorted ? -1 : 1;
          }
          break;
        case 'destinationCityName':
          if (
            a.flightRoute.routeDestination.airportCityName <
            b.flightRoute.routeDestination.airportCityName
          ) {
            return this.sorted ? 1 : -1;
          }
          if (
            a.flightRoute.routeDestination.airportCityName >
            b.flightRoute.routeDestination.airportCityName
          ) {
            return this.sorted ? -1 : 1;
          }
          break;
        case 'departureTime':
          if (a.flightDepartureTime < b.flightDepartureTime) {
            return this.sorted ? 1 : -1;
          }
          if (a.flightDepartureTime > b.flightDepartureTime) {
            return this.sorted ? -1 : 1;
          }
          break;
        case 'status':
          if (a.flightStatus < b.flightStatus) {
            return this.sorted ? 1 : -1;
          }
          if (a.flightStatus > b.flightStatus) {
            return this.sorted ? -1 : 1;
          }
          break;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }

  openCreateModal(targetModal: any, flight: any) {
    this.createFormFlight.patchValue({
      flightDepartureTime: moment().format('YYYY-MM-DDTHH:mm'),
    });
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  openEditModal(targetModal: any, flight: Flight) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    this.hours = Math.floor(flight.flightDuration / 3600);
    this.minutes = Math.floor((flight.flightDuration % 3600) / 60);
    this.editFormFlight.patchValue({
      flightId: flight.flightId,
      flightRoute: flight.flightRoute.routeId,
      flightAirplane: flight.flightAirplane.airplaneId,
      flightDepartureTime: moment(flight.flightDepartureTime)
        .format('YYYY-MM-DDTHH:mm')
        .toString(),
      flightSeatingId: flight.flightSeatingId,
      flightStatus: flight.flightStatus,
    });
  }

  openDeleteModal(targetModal: any, flight: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    this.selected = flight;
  }

  onSubmitCreate() {
    this.createFormFlight.patchValue({
      flightDuration: this.hours * 3600 + this.minutes * 60,
    });
    this.flightsService
      .createFlight(this.createFormFlight.getRawValue())
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          this.createFormFlight.reset();
          this.refreshTable();
        },
        (error) => {
          this.errorMessage = error.error.error;
        }
      );
  }

  onSubmitUpdate() {
    this.editFormFlight.patchValue({
      flightDuration: this.hours * 3600 + this.minutes * 60,
    });
    this.flightsService
      .updateFlight(this.editFormFlight.getRawValue())
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          this.editFormFlight.reset();
          this.refreshTable();
        },
        (error) => {
          this.errorMessage = error.error.error;
        }
      );
  }

  onSubmitDelete() {
    this.flightsService.deleteFlight(this.selected).subscribe(
      (data) => {
        this.modalService.dismissAll();
        this.refreshTable();
      },
      (error) => {
        this.errorMessage = error.error.error;
      }
    );
  }
}
