import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './menu-navbar.component.html',
  styleUrls: ['./menu-navbar.component.css']
})
export class MenuNavbarComponent implements OnInit {

   private jwtHelper: JwtHelperService;
   authenticationLink = 'Sign in';

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  ngOnInit(): void {
    this.displayUsername();
  }

  private displayUsername() {
    const token = localStorage.getItem('access_token');
    if (token === null || this.jwtHelper.isTokenExpired(token)) {
      return;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    this.authenticationLink = decodedToken.Username;
  }
}
