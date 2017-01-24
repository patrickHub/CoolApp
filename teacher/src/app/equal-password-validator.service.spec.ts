/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EqualPasswordValidatorService } from './equal-password-validator.service';

describe('EqualPasswordValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EqualPasswordValidatorService]
    });
  });

  it('should ...', inject([EqualPasswordValidatorService], (service: EqualPasswordValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
