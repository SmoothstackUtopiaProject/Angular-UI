import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { Airport } from 'src/app/model/airport';
import { AirportsService } from 'src/app/service/airports/airports.service';

@Component({
  selector: 'app-airports-view',
  templateUrl: './airports-view.component.html',
  styleUrls: ['./airports-view.component.css']
})
export class AirportsViewComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild('row', { static: true })
  row!: ElementRef;

  elements: any = [];
  airportList!: Airport[];
  headElements!: ['IATA', 'Name', 'City'];

  searchText: string = '';
  previos! : string;

  maxVisibleItems: number = 8;


  constructor(private airportService: AirportsService, private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput(){
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit(): void {
    this.getAllAirports();
    for(let i = 0; i<= this.getAllAirports.length; i++){
      this.elements.push({
      })
    }
  }


  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  getAllAirports(){
    this.airportService.getAllAirports().subscribe(
      response => {
        this.airportList = response;
        return response;
      }
    )
  }

}
