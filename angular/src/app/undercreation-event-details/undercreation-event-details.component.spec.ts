import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndercreationEventDetailsComponent } from './undercreation-event-details.component';

describe('UndercreationEventDetailsComponent', () => {
  let component: UndercreationEventDetailsComponent;
  let fixture: ComponentFixture<UndercreationEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndercreationEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndercreationEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
