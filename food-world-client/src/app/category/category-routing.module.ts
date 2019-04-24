import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SingleCategoryResolver } from '../core/resolvers/single-category.resolver';
import { AdminGuard } from '../core/guards/admin.guard';

const childRoutes: Routes = [
  { path: 'all', component: AllComponent },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: { category: SingleCategoryResolver },
    canActivate: [ AdminGuard ]
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( childRoutes ) ],
  exports: [ RouterModule ]
} )
export class CategoryRoutingModule { }
