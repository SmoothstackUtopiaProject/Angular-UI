import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  airports = "AIRPORTS";
  airplanes = "AIRPLANES";
  users = "USERS";
  flights = "FLIGHTS";

  currentView = "AIRPLANES";

  constructor() { }

  ngOnInit(): void {
  }

  displayView(selected: string) {
    this.currentView = selected;
  }

}
