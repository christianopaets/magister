import { TestBed, inject } from '@angular/core/testing';

import { RozenbaumService } from './rozenbaum.service';

describe('RozenbaumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RozenbaumService]
    });
  });

  it('should be created', inject([RozenbaumService], (service: RozenbaumService) => {
    expect(service).toBeTruthy();
  }));
});
