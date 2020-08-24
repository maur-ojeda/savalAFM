import { TestBed } from '@angular/core/testing';

import { AssetMoveService } from './asset-move.service';

describe('AssetMoveService', () => {
  let service: AssetMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
