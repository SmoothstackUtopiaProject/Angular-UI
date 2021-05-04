import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail!: string;
  userPassword!: string;
  errorMessage!: string;
  loading!: boolean;

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  isUserLoggedIn(){
    if(this.auth.getAuthenticatedUser()){
      this.router.navigate(['dashboard']);
    }
  }

  handleLogin() {
    this.loading = true;
    this.auth.login(this.userEmail, this.userPassword)
    .subscribe(
      data=>{
        this.router.navigate(['dashboard']);
      },
      error => {
        this.errorMessage = "Invalid email or password";
        this.loading = false;
      }
    )
  }
}
