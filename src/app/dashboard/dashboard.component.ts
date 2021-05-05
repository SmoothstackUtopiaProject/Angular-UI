import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bookAFlight = "BOOKaFLIGHT";
  users = "USERS";
  routes= "ROUTES";
  airports = "AIRPORTS";
  airplanes = "AIRPLANES";
  flights = "FLIGHTS";
  bookings = "BOOKINGS";
  currentView = "";

  hideMenu = false;

  constructor() { }

  ngOnInit(): void {

  }

  displayView(selected: string) {
    this.currentView = selected;
    console.log(selected)
    this.hideMenu = true;
  }

  returnToDashboard(){
    this.hideMenu = false;
    this.currentView = "";

  }


}
