import { TestBed } from '@angular/core/testing';

import { CcenterService } from './ccenter.service';

describe('CcenterService', () => {
  let service: CcenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
