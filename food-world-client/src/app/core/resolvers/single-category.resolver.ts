import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { first } from 'rxjs/operators';

import { CategoryService } from '../services/category.service';
import { Category } from '../models/category/category';

@Injectable()
export class SingleCategoryResolver implements Resolve<Category>{

  constructor ( private categoryService: CategoryService ) { }
  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    const id = route.params[ 'id' ];
    return this.categoryService.getById( id ).pipe( first() );
  }

}
