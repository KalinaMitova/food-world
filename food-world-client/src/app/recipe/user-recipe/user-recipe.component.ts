import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/core/services/recipe.service';

@Component( {
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrls: [ './user-recipe.component.css' ]
} )
export class UserRecipeComponent implements OnInit {
  private recipes$: Observable<Array<Recipe>>;
  private title: string;

  constructor (
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.title = 'My Recipes';;
    this.recipes$ = this.recipeService.getUserRecipes();
  }

}
