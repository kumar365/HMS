import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbBookingSuccessComponent } from './amb-booking-success.component';

describe('AmbBookingSuccessComponent', () => {
  let component: AmbBookingSuccessComponent;
  let fixture: ComponentFixture<AmbBookingSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbBookingSuccessComponent]
    });
    fixture = TestBed.createComponent(AmbBookingSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
