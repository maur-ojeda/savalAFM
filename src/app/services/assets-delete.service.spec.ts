import { TestBed } from '@angular/core/testing';

import { AssetsDeleteService } from './assets-delete.service';

describe('AssetsDeleteService', () => {
  let service: AssetsDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
