import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestComponent } from './lab-test.component';

describe('LabTestComponent', () => {
  let component: LabTestComponent;
  let fixture: ComponentFixture<LabTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabTestComponent]
    });
    fixture = TestBed.createComponent(LabTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
