import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSignupComponent } from './patient-signup.component';

describe('PatientSignupComponent', () => {
  let component: PatientSignupComponent;
  let fixture: ComponentFixture<PatientSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientSignupComponent]
    });
    fixture = TestBed.createComponent(PatientSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
