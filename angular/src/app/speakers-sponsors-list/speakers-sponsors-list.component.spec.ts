import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakersSponsorsListComponent } from './speakers-sponsors-list.component';

describe('SpeakersSponsorsListComponent', () => {
  let component: SpeakersSponsorsListComponent;
  let fixture: ComponentFixture<SpeakersSponsorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakersSponsorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakersSponsorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
