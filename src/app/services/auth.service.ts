import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSingUpRegister } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiKey: string = "AIzaSyCwyyty3E_ThfSoiwXdoX8BnQVgg5XIw_Q";
  registerUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey;
  singUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey;
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string){
    return this.http.post<AuthSingUpRegister>(this.registerUrl, {email, password, returnSecureToken: true})
  }

  singIn(email: string, password: string){
    return this.http.post<AuthSingUpRegister>(this.singUpUrl, {email, password, returnSecureToken: true})
  }
}
