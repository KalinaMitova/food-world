import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { AllComponent } from './all/all.component';


@NgModule( {
  declarations: [
    CreateComponent,
    EditComponent,
    DeleteComponent,
    AllComponent ],
  imports: [
    CommonModule,
    FormsModule,
    CategoryRoutingModule
  ]
} )
export class CategoryModule { }
