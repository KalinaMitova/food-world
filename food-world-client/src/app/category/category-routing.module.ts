import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

const childRoutes: Routes = [
  { path: 'all', component: AllComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'delete/:id', component: DeleteComponent },
];

@NgModule( {
  imports: [ RouterModule.forChild( childRoutes ) ],
  exports: [ RouterModule ]
} )
export class CategoryRoutingModule { }
