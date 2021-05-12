import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

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

  constructor(
    private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    if(!this.auth.getAuthenticatedUser()){
      this.router.navigate(['login']);
    }
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
