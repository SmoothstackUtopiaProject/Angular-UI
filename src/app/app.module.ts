import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { UsersViewComponent } from './admin-view/users-view/users-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AdminViewComponent,
    FlightsViewComponent,
    AirportsViewComponent,
    AirplanesViewComponent,
    RoutesViewComponent,
    SidebarComponent,
    LoadingComponent,
    UsersViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    OrderModule

  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
