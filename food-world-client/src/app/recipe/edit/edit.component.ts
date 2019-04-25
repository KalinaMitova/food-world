import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { Category } from 'src/app/core/models/category/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component( {
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.css' ]
} )
export class EditComponent implements OnInit {

  @ViewChild( 'form' ) from: NgForm;
  private recipe: Recipe;
  private editSubscr: Subscription;
  private categories$: Observable<Array<Category>>;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private location: Location,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.recipe = this.route.snapshot.data[ 'recipe' ];

  }
  editRecipe() {
    const editedRec = this.from.value;
    editedRec.creator = this.recipe.creator;
    this.editSubscr = this.recipeService
      .editRecipe( editedRec, this.recipe[ 'id' ] )
      .subscribe( data => {
        this.router.navigate( [ `/recipe/details/${this.recipe[ 'id' ]}` ] )
      } )
  }

  backClicked() {
    this.location.back();
  }

  ngOnDestroy(): void {
    if ( this.editSubscr ) {
      this.editSubscr.unsubscribe();
    }
  }

}
