import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';
import { ValidateImageUrlDirective } from '../core/directives/validate-image-url.directive';
import { SingleCategoryResolver } from '../core/resolvers/single-category.resolver';
import { SingleCategoryComponent } from './single-category/single-category.component';


@NgModule( {
  declarations: [
    CreateComponent,
    EditComponent,
    AllComponent,
    ValidateImageUrlDirective,
    SingleCategoryComponent ],
  imports: [
    CommonModule,
    FormsModule,
    CategoryRoutingModule
  ],
  providers: [
    SingleCategoryResolver
  ]
} )
export class CategoryModule { }
