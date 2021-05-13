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
import { Route } from 'src/app/model/route';
import { RoutesService } from 'src/app/service/routes/routes.service';

@Component({
  selector: 'app-routes-view',
  templateUrl: './routes-view.component.html',
  styleUrls: ['./routes-view.component.css'],
})
export class RoutesViewComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective;
  @ViewChild('row', { static: true }) row!: ElementRef;

  route!: Route;
  routeList: Route[] = [];
  editFormRoute!: FormGroup;
  createFormRoute!: FormGroup;
  selected!: Route;
  searchText!: string;
  previous!: string;
  errorMessage = '';
  hideMenu!: string | null;
  page!: any;
  sorted = false;
  loading!: boolean;
  updateTable!: boolean;

  formData = {
    routeId: [''],
    routeOriginIataId: [''],
    routeDestinationIataId: [''],
  };

  constructor(
    private routeService: RoutesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private dashboard: DashboardComponent
  ) {}

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit(): void {
    this.getAllRoutes();
    this.editFormRoute = this.fb.group(this.formData);
    this.createFormRoute = this.fb.group(this.formData);
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.routeList = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.routeList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  returnToDashboard() {
    this.dashboard.returnToDashboard();
  }

  getAllRoutes() {
    this.loading = true;
    this.routeService.getAllRoutes().subscribe(
      (response) => {
        this.loading = false;
        this.mdbTable.setDataSource(response);
        this.routeList = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  refreshTable() {
    this.updateTable = true;
    this.routeService.getAllRoutes().subscribe(
      (response) => {
        this.updateTable = false;
        this.mdbTable.setDataSource(response);
        this.routeList = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sortBy(by: string | any): void {
    this.routeList.sort((a: Route, b: Route) => {
      switch (by) {
        case 'routeId':
          if (a.routeId < b.routeId) {
            return this.sorted ? 1 : -1;
          }
          if (a.routeId > b.routeId) {
            return this.sorted ? -1 : 1;
          }
          break;
        case 'routeOrigin':
          if (a.routeOrigin.airportIataId < b.routeOrigin.airportIataId) {
            return this.sorted ? 1 : -1;
          }
          if (a.routeOrigin.airportIataId > b.routeOrigin.airportIataId) {
            return this.sorted ? -1 : 1;
          }
          break;
        case 'routeDestination':
          if (
            a.routeDestination.airportIataId < b.routeDestination.airportIataId
          ) {
            return this.sorted ? 1 : -1;
          }
          if (
            a.routeDestination.airportIataId > b.routeDestination.airportIataId
          ) {
            return this.sorted ? -1 : 1;
          }
          break;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }

  openCreateModal(targetModal: any, route: Route) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  openEditModal(targetModal: any, route: Route) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    this.editFormRoute.patchValue({
      routeId: route.routeId,
      routeOriginIataId: route.routeOrigin.airportIataId,
      routeDestinationIataId: route.routeDestination.airportIataId,
    });
  }

  openDeleteModal(targetModal: any, route: Route) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    this.selected = route;
  }

  onSubmitCreate() {
    this.routeService.createRoute(this.createFormRoute.getRawValue()).subscribe(
      (data) => {
        this.modalService.dismissAll();
        this.createFormRoute.reset();
        this.refreshTable();
      },
      (error) => {
        this.errorMessage = error.error.error;
      }
    );
  }

  onSubmitUpdate() {
    this.routeService.updateRoute(this.editFormRoute.getRawValue()).subscribe(
      (data) => {
        this.modalService.dismissAll();
        this.editFormRoute.reset();
        this.refreshTable();
      },
      (error) => {
        this.errorMessage = error.error.error;
      }
    );
  }

  onSubmitDelete() {
    this.routeService.deleteRoute(this.selected).subscribe(
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
