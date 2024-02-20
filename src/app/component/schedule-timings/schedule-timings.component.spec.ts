import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTimingsComponent } from './schedule-timings.component';

describe('ScheduleTimingsComponent', () => {
  let component: ScheduleTimingsComponent;
  let fixture: ComponentFixture<ScheduleTimingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleTimingsComponent]
    });
    fixture = TestBed.createComponent(ScheduleTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
