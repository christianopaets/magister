import { TestBed, inject } from '@angular/core/testing';

import { MannWhitneyService } from './mann-whitney.service';

describe('MannWhitneyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MannWhitneyService]
    });
  });

  it('should be created', inject([MannWhitneyService], (service: MannWhitneyService) => {
    expect(service).toBeTruthy();
  }));
});
