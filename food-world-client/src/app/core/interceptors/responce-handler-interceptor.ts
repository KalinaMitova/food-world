import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ResponceHandlerInterceptor implements HttpInterceptor {
  constructor ( public toastr: ToastrService
  ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle( req )
      .pipe( tap( evt => {
        if ( evt instanceof HttpResponse ) {
          console.log( evt );
          if ( evt.status === 201 ) {
            this.toastr.success( evt.statusText, 'Success:', { positionClass: 'toast-top-center' } );
          } else if ( evt.status === 200 && evt.body.message ) {
            this.toastr.success( evt.body.message, 'Success:' );
          }
        }
      } ), catchError( ( err: any ) => {
        console.log( err );
        if ( err instanceof HttpErrorResponse ) {
          try {
            if ( err.error.description ) {
              this.toastr.error( err.error.description, 'Error:', { positionClass: 'toast-top-center' } );
            } else if ( err.error.message ) {
              this.toastr.error( err.error.message, 'Error:' );
            } else if ( err.message ) {
              this.toastr.error( err.message, 'Error:' );
            }
          } catch ( e ) {
            this.toastr.error( 'An error occurred', '' );
          }
        }
        throw ( err );
      } ) );

  }
}
