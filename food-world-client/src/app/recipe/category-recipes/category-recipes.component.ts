import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe';
import { AuthService } from 'src/app/core/services/auth.service';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-category-recipes',
  templateUrl: './category-recipes.component.html',
  styleUrls: [ './category-recipes.component.css' ]
} )
export class CategoryRecipesComponent implements OnInit {
  private recipes$: Observable<Array<Recipe>>;
  private title: string;

  constructor (
    private route: ActivatedRoute,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    const categoryName = this.route.snapshot.params.categoryName;
    this.recipes$ = this.recipeService.getAllRecepiesByCategoryName( categoryName );
    this.title = categoryName;
  }

}
