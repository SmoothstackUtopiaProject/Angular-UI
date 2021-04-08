import { AirplanesService } from './../../service/airplanes/airplanes.service';
import { Airplane } from './../../model/airplane';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airplanes-view',
  templateUrl: './airplanes-view.component.html',
  styleUrls: ['./airplanes-view.component.css']
})
export class AirplanesViewComponent implements OnInit {

  airplaneList: Airplane[] = [];
  currentSort = "up";
  sortedItem = "";

  constructor(private airplanesService: AirplanesService) { }

  ngOnInit(): void {
    this.getAllAirplanes();
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

}
