import { TestBed } from '@angular/core/testing';

import { FixedassetsService } from './fixedassets.service';

describe('FixedassetsService', () => {
  let service: FixedassetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedassetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
