//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

//Components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


//add httpclientModule

@NgModule( {
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
} )
export class AuthModule { }
