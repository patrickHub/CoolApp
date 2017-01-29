/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmailValidatorService } from './email-validator.service';

describe('EmailValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailValidatorService]
    });
  });

  it('should ...', inject([EmailValidatorService], (service: EmailValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
