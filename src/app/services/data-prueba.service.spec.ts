import { TestBed } from '@angular/core/testing';

import { DataPruebaService } from './data-prueba.service';

describe('DataPruebaService', () => {
  let service: DataPruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
