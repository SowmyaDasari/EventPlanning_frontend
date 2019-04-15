import { TestBed, inject } from '@angular/core/testing';

import { UndercreationeventService } from './undercreationevent.service';

describe('UndercreationeventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UndercreationeventService]
    });
  });

  it('should be created', inject([UndercreationeventService], (service: UndercreationeventService) => {
    expect(service).toBeTruthy();
  }));
});
