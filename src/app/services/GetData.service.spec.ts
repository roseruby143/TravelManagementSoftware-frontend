import { TestBed } from '@angular/core/testing';

import { GetDataService } from './GetData.service';

describe('NavbarListService', () => {
  let service: GetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
