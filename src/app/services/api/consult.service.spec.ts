import { TestBed } from '@angular/core/testing';

import { ConsultService } from './consult.service';

describe('ConsultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultService = TestBed.get(ConsultService);
    expect(service).toBeTruthy();
  });
});
