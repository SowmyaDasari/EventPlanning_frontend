import { TestBed, inject } from '@angular/core/testing';

import { SpeakerSponsor1Service } from './speaker-sponsor1.service';

describe('SpeakerSponsor1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeakerSponsor1Service]
    });
  });

  it('should be created', inject([SpeakerSponsor1Service], (service: SpeakerSponsor1Service) => {
    expect(service).toBeTruthy();
  }));
});
