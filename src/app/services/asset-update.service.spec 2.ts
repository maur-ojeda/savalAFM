import { TestBed } from '@angular/core/testing';

import { AssetUpdateService } from './asset-update.service';

describe('AssetUpdateService', () => {
  let service: AssetUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
