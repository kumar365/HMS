import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsultationComponent } from './new-consultation.component';

describe('NewConsultationComponent', () => {
  let component: NewConsultationComponent;
  let fixture: ComponentFixture<NewConsultationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewConsultationComponent]
    });
    fixture = TestBed.createComponent(NewConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
