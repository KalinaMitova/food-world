import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/core/models/register-user';

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
} )
export class RegisterComponent {
  @ViewChild( 'form' ) registerForm: NgForm

  constructor (
    private authService: AuthService,
    private router: Router
  ) { }

  register() {
    console.log( this.registerForm.value );
    this.authService
      .register( this.registerForm.value )
      .subscribe( ( data ) => {
        console.log( data );
        if ( this.registerForm.valid ) {
          this.registerForm.reset();
        }
        this.router.navigate( [ '/user/login' ] );
      } )
  }
}
