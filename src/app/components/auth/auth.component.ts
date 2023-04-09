import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSingInRegister } from 'src/app/models/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  loading: boolean = false;
  error: string = "";
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  toggle() {
    this.isLogin = !this.isLogin;
    if(!this.isLogin) this.error = "";
  }

  handleAuth(form: NgForm) {
    if(!form.valid) return
    this.loading = true;
    const email = form.value.email;
    const password = form.value.password;
    var authResponse: Observable<AuthSingInRegister>;
    if(this.isLogin){
      authResponse = this.authenticationService.singIn(email, password)
    }else{
      authResponse = this.authenticationService.signUp(email, password)
    }
    authResponse.subscribe({
      next: (response) => {
        this.loading = false;
        this.error = "";
        this.router.navigate(["/"]);
      },
      error: (error) => {
        this.error = error
        this.loading = false;
      }
    })
  }

}
