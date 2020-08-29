import { TestBed } from '@angular/core/testing';

import { AssetsUpdateService } from './assets-update.service';

describe('AssetsUpdateService', () => {
  let service: AssetsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
