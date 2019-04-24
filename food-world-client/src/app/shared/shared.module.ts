import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CollapseDirective } from '../core/directives/collapse.directive';

@NgModule( {
  declarations: [
    NavbarComponent,
    CollapseDirective ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ NavbarComponent ]
} )
export class SharedModule { }
