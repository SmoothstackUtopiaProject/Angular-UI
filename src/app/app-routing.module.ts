import { AdminViewComponent } from './admin-view/admin-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './shared/loading/loading.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'admin', component: AdminViewComponent},
  {path: 'loading', component: LoadingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
