import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './core/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'user',
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [ UserGuard ]
  }

];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
