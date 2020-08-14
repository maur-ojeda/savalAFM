import { TestBed } from '@angular/core/testing';

import { FixedAssetDataService } from './fixed-asset-data.service';

describe('FixedAssetDataService', () => {
  let service: FixedAssetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedAssetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
