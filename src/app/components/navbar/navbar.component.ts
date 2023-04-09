import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean = false;
  // isAdmin: boolean = false;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.user.subscribe(user => {
      this.isAuth = !!user
    })
    // this.authorizationService.user.subscribe(user => {
    //   this.isAdmin = user.role == "admin" ? true : false
    // })
  }

  signOut() {
    this.authenticationService.singOut();
  }
}
