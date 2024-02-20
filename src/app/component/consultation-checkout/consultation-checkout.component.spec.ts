import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCheckoutComponent } from './consultation-checkout.component';

describe('ConsultationCheckoutComponent', () => {
  let component: ConsultationCheckoutComponent;
  let fixture: ComponentFixture<ConsultationCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationCheckoutComponent]
    });
    fixture = TestBed.createComponent(ConsultationCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
