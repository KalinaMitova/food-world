import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: [ './details.component.css' ]
} )
export class DetailsComponent implements OnInit, OnDestroy {

  private recipe: Recipe;
  private isAdmin: boolean;
  private isAuthor: boolean;
  private isAuthenticated: boolean;
  private deleteSubscr: Subscription;
  private favoriteSubscr: Subscription;
  private isFavorite: boolean;

  constructor (
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipe = this.route.snapshot.data[ 'recipe' ];
    this.isAdmin = this.authService.isAdmin();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAuthor = this.authService.isAuthor( this.recipe.creator );
    if ( this.isAuthenticated ) {
      this.favoriteSubscr = this.recipeService.getUserFavoritesRecipes().subscribe( recipes => {
        this.isFavorite = recipes.filter( r => r._id === this.recipe[ 'id' ] ).length > 0
      } )
    }

  }
  deleteRecipe( id: string ) {
    this.deleteSubscr = this.recipeService
      .deleteRecipe( id )
      .subscribe( ( data ) => {
        this.router.navigate( [ "category/all" ] )
      } )
  }

  addRecipeToFavorites( id: string ) {
    this.recipeService
      .postAddToFavorites( id )
      .subscribe( () => {
        this.isFavorite = true;
      } );

  }
  removeRecipeFromFavorites( id: string ) {
    this.recipeService
      .postRemoveFromFavorites( id )
      .subscribe( () => {
        this.isFavorite = false;
      } );

  }

  ngOnDestroy(): void {
    if ( this.deleteSubscr ) {
      this.deleteSubscr.unsubscribe();
    }
    if ( this.favoriteSubscr ) {
      this.favoriteSubscr.unsubscribe();
    }
  }
}
