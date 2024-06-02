import { TestBed } from '@angular/core/testing';

import { ConectarAppService } from './conectar-app.service';

describe('ConectarAppService', () => {
  let service: ConectarAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConectarAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
