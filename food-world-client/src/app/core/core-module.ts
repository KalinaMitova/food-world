import { NgModule } from "@angular/core";
import { ValidateImageUrlDirective } from './directives/validate-image-url.directive';

@NgModule( {
  imports: [],
  declarations: [ ValidateImageUrlDirective ],
  exports: [ ValidateImageUrlDirective ]
} )
export class CoreModule { }
