import { TestBed } from '@angular/core/testing';

import { AssetDeleteService } from './asset-delete.service';

describe('AssetDeleteService', () => {
  let service: AssetDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
