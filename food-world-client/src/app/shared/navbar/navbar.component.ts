import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component( {
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
} )
export class NavbarComponent implements DoCheck {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  constructor (
    private authService: AuthService,
    private router: Router ) { }

  ngDoCheck() {
    this.username = this.authService.username;
    this.isLoggedIn = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate( [ '/' ] );
  }

}
