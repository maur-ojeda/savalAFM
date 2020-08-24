import { TestBed } from '@angular/core/testing';

import { AssetDetailService } from './asset-detail.service';

describe('AssetDetailService', () => {
  let service: AssetDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
