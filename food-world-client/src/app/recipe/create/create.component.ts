import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Category } from 'src/app/core/models/category/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [ './create.component.css' ]
} )
export class CreateComponent implements OnInit {
  @ViewChild( 'form' ) form: NgForm;
  private categories: Observable<Array<Category>>;
  private createSubscr: Subscription;

  constructor (
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.categories = this.categoryService.getAll();
  }

  createRecipe() {
    this.recipeService
      .createRecipe( this.form.value )
      .subscribe( data => {
        if ( this.form.valid ) {
          this.form.reset();
          this.router.navigate( [ '/category/all' ] )
        }
      } )
  }
  backClicked() {
    this.location.back();
  }

  ngOnDestroy(): void {
    if ( this.createSubscr ) {
      this.createSubscr.unsubscribe();
    }
  }
}
