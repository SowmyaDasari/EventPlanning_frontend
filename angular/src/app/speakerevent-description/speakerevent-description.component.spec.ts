import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakereventDescriptionComponent } from './speakerevent-description.component';

describe('SpeakereventDescriptionComponent', () => {
  let component: SpeakereventDescriptionComponent;
  let fixture: ComponentFixture<SpeakereventDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakereventDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakereventDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
