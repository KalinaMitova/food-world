//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

//Components
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt-interceptor';
import { ResponceHandlerInterceptor } from './core/interceptors/responce-handler-interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ValidateImageUrlDirective } from './core/directives/validate-image-url.directive';



@NgModule( {
  declarations: [
    ValidateImageUrlDirective,
    AppComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SharedModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponceHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
