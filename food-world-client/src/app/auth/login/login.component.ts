import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
} )
export class LoginComponent {
  @ViewChild( 'form' ) form: NgForm;
  constructor (
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService
      .login( this.form.value )
      .subscribe( data => {
        console.log( data );
        this.authService.saveUserInfo( data );
        if ( this.form.valid ) {
          this.form.reset();
          this.router.navigate( [ '/' ] )
        }
      } )
  }

}
