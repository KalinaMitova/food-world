import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/core/models/category/category';

@Component( {
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: [ './single-category.component.css' ]
} )
export class SingleCategoryComponent implements OnInit {
  @Input( 'category' ) category: Category;
  @Input( 'isAdmin' ) isAdmin: boolean;

  @Output() deleteEmiter = new EventEmitter<string>();

  constructor () { }

  ngOnInit() {
  }

  deleteCategoryEmit( id: string ) {
    this.deleteEmiter.emit( id );
  }

}
