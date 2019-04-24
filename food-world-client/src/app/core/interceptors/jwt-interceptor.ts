import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor ( private authService: AuthService
  ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const authToken = this.authService.token;

    if ( !req.url.includes( '/auth/' ) ) {
      const request = req.clone( {
        setHeaders: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      } );
      return next.handle( request );
    }

    return next.handle( req );
  }
}
