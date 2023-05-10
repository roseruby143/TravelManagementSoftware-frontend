import { TestBed } from '@angular/core/testing';

import { ComponentAccessGuard } from './component-access.guard';

describe('ComponentAccessGuard', () => {
  let guard: ComponentAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComponentAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
