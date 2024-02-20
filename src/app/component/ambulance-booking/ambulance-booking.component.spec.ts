import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceBookingComponent } from './ambulance-booking.component';

describe('AmbulanceBookingComponent', () => {
  let component: AmbulanceBookingComponent;
  let fixture: ComponentFixture<AmbulanceBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbulanceBookingComponent]
    });
    fixture = TestBed.createComponent(AmbulanceBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
