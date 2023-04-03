import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthSingUpRegister } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  loading: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggle() {
    this.isLogin = !this.isLogin;
  }

  handleAuth(form: NgForm) {
    if(!form.valid) return
    this.loading = true;
    const email = form.value.email;
    const password = form.value.password;
    var authResponse: Observable<AuthSingUpRegister>;
    if(this.isLogin){
      authResponse = this.authService.singIn(email, password)
    }else{
      authResponse = this.authService.signUp(email, password)
    }
    authResponse.subscribe(response => {
      this.loading = false;
      console.log(response)
    })
  }

}
