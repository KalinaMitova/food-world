import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGuard } from './core/guards/user.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'category/all'
  },
  {
    path: 'user',
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [ UserGuard ]
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule',
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
