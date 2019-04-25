import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { UserRecipeComponent } from './user-recipe/user-recipe.component';

import { FavoriteComponent } from './favorite/favorite.component';
import { SingleRecipeResolver } from '../core/resolvers/single-recipe.resolver';
import { CategoryRecipesComponent } from './category-recipes/category-recipes.component';

const childRoutes: Routes = [
  {
    path: 'details/:id', component: DetailsComponent,
    resolve: { recipe: SingleRecipeResolver },
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: { recipe: SingleRecipeResolver },
    canActivate: [ AuthGuard ]
  },
  {
    path: 'user',
    component: UserRecipeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'user/favorite',
    component: FavoriteComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: ':categoryName',
    component: CategoryRecipesComponent,
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( childRoutes ) ],
  exports: [ RouterModule ]
} )
export class RecipeRoutingModule { }
