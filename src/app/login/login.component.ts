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

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.auth.login(this.userEmail, this.userPassword)
    .subscribe(
      data=>{
        this.router.navigate(['dashboard']);
      },
      error => {
        this.errorMessage = "Invalid email or password";
      }
    )
  }
}
