import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UserRecipeComponent } from './user-recipe/user-recipe.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipe-router.module';
import { SingleRecipeResolver } from '../core/resolvers/single-recipe.resolver';

@NgModule( {
  declarations: [
    CreateComponent,
    EditComponent,
    RecipeListComponent,
    UserRecipeComponent,
    FavoriteComponent,
    DetailsComponent ],
  imports: [
    CommonModule,
    FormsModule,
    RecipeRoutingModule
  ],
  providers: [
    SingleRecipeResolver
  ]
} )
export class RecipeModule { }
