import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component( {
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: [ './all.component.css' ]
} )
export class AllComponent implements OnInit, DoCheck, OnDestroy {

  private categories: Observable<Category[]>;
  private isAdmin: boolean;
  private deleteSubscr: Subscription;

  constructor (
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.categories = this.categoryService.getAll();
  }

  ngDoCheck() {
    this.isAdmin = this.authService.isAdmin();
  }

  deleteCategory( id: string ) {
    this.deleteSubscr = this.categoryService
      .deleteCategory( id )
      .subscribe( data => {
        this.categories = this.categoryService.getAll();
      } )
  }

  ngOnDestroy(): void {
    if ( this.deleteSubscr ) {
      this.deleteSubscr.unsubscribe();
    }
  }

}
