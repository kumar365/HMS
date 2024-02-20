import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConsultationComponent } from './booking-consultation.component';

describe('BookingConsultationComponent', () => {
  let component: BookingConsultationComponent;
  let fixture: ComponentFixture<BookingConsultationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingConsultationComponent]
    });
    fixture = TestBed.createComponent(BookingConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
