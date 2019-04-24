import {
  NG_VALIDATORS,
  Validator,
  AbstractControl
} from '@angular/forms';
import { Directive } from '@angular/core';

@Directive( {
  selector: '[appValidateImageUrl]',
  providers: [ {
    provide: NG_VALIDATORS,
    useExisting: ValidateImageUrlDirective,
    multi: true
  } ]
} )

export class ValidateImageUrlDirective implements Validator {
  validate( control: AbstractControl ): { [ key: string ]: any } | null {
    return imageUrlValidator( control );
  }

  constructor () { }
}
export function imageUrlValidator( control: AbstractControl ): { [ key: string ]: any } | null {
  const imageValue = control.value;
  if ( imageValue && imageValue.startsWith( 'http' ) &&
    ( imageValue.endsWith( 'jpg' ) || imageValue.endsWith( 'png' ) ) ) {
    return null;
  } else {
    return { 'imageUrl': true };
  }
};
