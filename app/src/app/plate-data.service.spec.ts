import { TestBed } from '@angular/core/testing';

import { PlateDataService } from './plate-data.service';

describe('PlateDataService', () => {
  let service: PlateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
