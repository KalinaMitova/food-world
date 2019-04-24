//Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const childRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule( {
  imports: [ RouterModule.forChild( childRoutes ) ],
  exports: [ RouterModule ]
} )

export class AuthRoutingModule { }
