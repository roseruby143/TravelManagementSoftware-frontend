import { TestBed } from '@angular/core/testing';

import { ValidateFormInputService } from './validate-form-input.service';

describe('ValidateFormInputService', () => {
  let service: ValidateFormInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateFormInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
