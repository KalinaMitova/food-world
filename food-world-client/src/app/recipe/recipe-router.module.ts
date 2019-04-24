import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SingleCategoryResolver } from '../core/resolvers/single-category.resolver';
import { AuthGuard } from '../core/guards/auth.guard';
import { UserRecipeComponent } from './user-recipe/user-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const childRoutes: Routes = [
  {
    path: 'details', component: DetailsComponent,
    resolve: { category: SingleCategoryResolver },
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: { category: SingleCategoryResolver },
    canActivate: [ AuthGuard ]
  },
  {
    path: 'user/',
    component: UserRecipeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'user/favorites',
    component: UserRecipeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'category/:id',
    component: RecipeListComponent,
    canActivate: [ AuthGuard ]
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( childRoutes ) ],
  exports: [ RouterModule ]
} )
export class RecipeRoutingModule { }
