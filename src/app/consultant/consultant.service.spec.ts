import { TestBed, inject } from '@angular/core/testing';

import { ConsultantService } from './consultant.service';

describe('ConsultantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultantService]
    });
  });

  it('should ...', inject([ConsultantService], (service: ConsultantService) => {
    expect(service).toBeTruthy();
  }));
});
