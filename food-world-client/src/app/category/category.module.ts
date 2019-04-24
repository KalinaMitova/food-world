import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';
import { SingleCategoryResolver } from '../core/resolvers/single-category.resolver';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { CoreModule } from '../core/core-module';


@NgModule( {
  declarations: [
    CreateComponent,
    EditComponent,
    AllComponent,
    SingleCategoryComponent ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    CategoryRoutingModule
  ],
  providers: [
    SingleCategoryResolver
  ]
} )
export class CategoryModule { }
