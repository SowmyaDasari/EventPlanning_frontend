import { TestBed, inject } from '@angular/core/testing';

import { SpeakerSponsorService } from './speaker-sponsor.service';

describe('SpeakerSponsorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeakerSponsorService]
    });
  });

  it('should be created', inject([SpeakerSponsorService], (service: SpeakerSponsorService) => {
    expect(service).toBeTruthy();
  }));
});
