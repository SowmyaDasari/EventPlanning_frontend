import { TestBed, inject } from '@angular/core/testing';

import { SpeakereventDescriptionService } from './speakerevent-description.service';

describe('SpeakereventDescriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeakereventDescriptionService]
    });
  });

  it('should be created', inject([SpeakereventDescriptionService], (service: SpeakereventDescriptionService) => {
    expect(service).toBeTruthy();
  }));
});
