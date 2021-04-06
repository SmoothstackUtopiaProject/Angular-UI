import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { FlightsViewComponent } from './admin-view/flights-view/flights-view.component';
import { AirportsViewComponent } from './admin-view/airports-view/airports-view.component';
import { AirplanesViewComponent } from './admin-view/airplanes-view/airplanes-view.component';
import { RoutesViewComponent } from './admin-view/routes-view/routes-view.component';
import { SidebarComponent } from './admin-view/sidebar/sidebar.component';
import { AuthenticationService } from './service/authentication/authentication.service';
import { HttpIntercepterService } from './service/http/http-intercepter.service';
import { LoadingComponent } from './shared/loading/loading.component';

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
    RoutesViewComponent,
    SidebarComponent
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
