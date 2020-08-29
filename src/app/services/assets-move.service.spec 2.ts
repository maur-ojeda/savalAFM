import { TestBed } from '@angular/core/testing';

import { AssetsMoveService } from './assets-move.service';

describe('AssetsMoveService', () => {
  let service: AssetsMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
