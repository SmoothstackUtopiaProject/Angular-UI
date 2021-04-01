import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { FlightsViewComponent } from './admin-view/flights-view/flights-view.component';
import { AirportsViewComponent } from './admin-view/airports-view/airports-view.component';
import { AirplanesViewComponent } from './admin-view/airplanes-view/airplanes-view.component';
import { RoutesViewComponent } from './admin-view/routes-view/routes-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    AdminViewComponent,
    FlightsViewComponent,
    AirportsViewComponent,
    AirplanesViewComponent,
    RoutesViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
