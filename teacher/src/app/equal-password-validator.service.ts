import {AbstractControl, FormGroup} from '@angular/forms';
import { Injectable }    from '@angular/core';

@Injectable()
export class EqualPasswordValidatorService {

  constructor() { }
  validate(firstField: string, secondField: string) {

    return (c: FormGroup) => {

      return (c.controls && c.controls[firstField].value == c.controls[secondField].value) ? null : {
        passwordsEqual: {
          valid: false
        }
      };
    }
  }

}

