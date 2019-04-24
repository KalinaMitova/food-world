import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category/category';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.css' ]
} )
export class EditComponent implements OnInit, OnDestroy {

  @ViewChild( 'form' ) from: NgForm;
  private category: Category;
  private editSubscr: Subscription;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.category = this.route.snapshot.data[ 'category' ];
  }
  editCategory() {
    this.editSubscr = this.categoryService
      .editCategory( this.from.value, this.category._id )
      .subscribe( data => {
        this.router.navigate( [ '/category/all' ] )
      } )
  }

  backClicked() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.editSubscr.unsubscribe();
  }

}
