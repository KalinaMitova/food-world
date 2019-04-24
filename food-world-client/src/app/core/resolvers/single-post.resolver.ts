import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { first } from 'rxjs/operators';

import { PostService } from '../services/recipe.service';
import { PostInfo } from '../models/post-info';

@Injectable()
export class SinglePostResolver implements Resolve<PostInfo>{

  constructor ( private postService: PostService ) { }
  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    const id = route.params[ 'id' ];
    return this.postService.getDetails( id ).pipe( first() );
  }

}
