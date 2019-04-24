import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/core/services/category.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [ './create.component.css' ]
} )
export class CreateComponent implements OnInit, OnDestroy {

  @ViewChild( 'form' ) form: NgForm;
  private createSubscr: Subscription;

  constructor (
    private categoryService: CategoryService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  createCategory() {
    this.createSubscr = this.categoryService
      .createCategory( this.form.value )
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
    this.createSubscr.unsubscribe();
  }

}
