import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerSponsor1Component } from './speaker-sponsor1.component';

describe('SpeakerSponsor1Component', () => {
  let component: SpeakerSponsor1Component;
  let fixture: ComponentFixture<SpeakerSponsor1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerSponsor1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerSponsor1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
