import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSingInRegister } from '../models/auth';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { UserRole } from '../models/user-role';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiKey: string = "AIzaSyCwyyty3E_ThfSoiwXdoX8BnQVgg5XIw_Q";
  url: string = "https://ng-ecommerce-app-default-rtdb.europe-west1.firebasedatabase.app/";
  registerUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey;
  singUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey;
  user = new BehaviorSubject<User | null>(null);
  isAdmin = false;
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string){
    return this.http.post<AuthSingInRegister>(this.registerUrl, {email, password, returnSecureToken: true})
    .pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn, true)
      }),
      catchError(this.handleError)
    )
  }

  singIn(email: string, password: string){
    return this.http.post<AuthSingInRegister>(this.singUpUrl, {email, password, returnSecureToken: true})
    .pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn, false)
      }),
      catchError(this.handleError)
    )
  }

  singOut(){
    this.user.next(null);
    localStorage.removeItem("user");
  }

  refreshLogin(){
    if(localStorage.getItem("user") == null) return;
    const user = JSON.parse(localStorage.getItem("user") || "")
    const savedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate))

    if(savedUser.token) this.user.next(savedUser)
  }

  private createUserRole(userRole: UserRole, user: User): Observable<UserRole>{
    return this.http.post<UserRole>(this.url + "/userRoles.json?auth=" + user?.token, userRole)  
  }

  private userRole(localId: string){
    this.http.get<any>(this.url + "userRoles.json").subscribe(response => {
    })
  }

  private handleUser(email: string, localId: string, idToken: string, expiresIn: string, registered: boolean){
    let expirationDate = new Date(new Date().getTime() + (+expiresIn*1000));
    let user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    localStorage.setItem("user", JSON.stringify(user));
    registered && this.createUserRole({email, roleId: 1, userId: localId}, user).subscribe(response => {});
    this.userRole(localId);
  }

  private handleError(error: HttpErrorResponse) {
    var message = "Error";
    if(error.error.error){
      switch(error.error.error.message){
        case "EMAIL_EXIST":
          message = "The email address is already in use by another account."
          break;
        case "OPERATION_NOT_ALLOWED":
          message = "Password sign-in is disabled for this project."
          break;
        case "EMAIL_NOT_FOUND":
          message = "There is no user record corresponding to this identifier. The user may have been deleted."
          break;        
        case "INVALID_PASSWORD":
          message = "The password is invalid or the user does not have a password."
          break;
      }
    }
    return throwError(() => message);
  }
}
