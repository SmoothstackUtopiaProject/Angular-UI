import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName = localStorage.getItem('authenticaterUser');

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('authenticaterUser');
    
  }

  onLogout(){
    console.log(this.userName);
    this.auth.logout();
    this.router.navigate(['login'])
  }

}
