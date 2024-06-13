import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestListComponent } from './lab-test-list.component';

describe('LabTestListComponent', () => {
  let component: LabTestListComponent;
  let fixture: ComponentFixture<LabTestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabTestListComponent]
    });
    fixture = TestBed.createComponent(LabTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
