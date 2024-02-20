import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBookingSuccessComponent } from './test-booking-success.component';

describe('TestBookingSuccessComponent', () => {
  let component: TestBookingSuccessComponent;
  let fixture: ComponentFixture<TestBookingSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestBookingSuccessComponent]
    });
    fixture = TestBed.createComponent(TestBookingSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
