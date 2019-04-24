import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { first } from 'rxjs/operators';

import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';

@Injectable()
export class SingleRecipeResolver implements Resolve<Recipe>{

  constructor ( private recipeService: RecipeService ) { }
  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    const id = route.params[ 'id' ];
    return this.recipeService.getDetails( id ).pipe( first() );
  }

}
