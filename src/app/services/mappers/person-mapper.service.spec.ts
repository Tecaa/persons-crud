import { TestBed } from '@angular/core/testing';

import { PersonMapperService } from './person-mapper.service';

describe('PersonMapperService', () => {
  let service: PersonMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
