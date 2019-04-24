import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe';

@Component( {
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: [ './favorite.component.css' ]
} )
export class FavoriteComponent implements OnInit {
  private isAdmin: boolean;
  private isAuthenticated: boolean;
  private recipes$: Observable<Array<Recipe>>;
  private title: string;

  constructor (
    private authService: AuthService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isAuthenticated = this.authService.isAuthenticated();
    const title = "My Favorite Recipes";
    this.recipes$ = this.recipeService.getUserFavoritesRecipes();
  }

}
