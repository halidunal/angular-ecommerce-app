import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean = false;
  // isAdmin: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuth = !!user
    })
    // this.authorizationService.user.subscribe(user => {
    //   this.isAdmin = user.role == "admin" ? true : false
    // })
  }

  signOut() {
    this.authService.singOut();
  }
}
