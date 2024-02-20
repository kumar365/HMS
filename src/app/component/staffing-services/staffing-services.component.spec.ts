import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffingServicesComponent } from './staffing-services.component';

describe('StaffingServicesComponent', () => {
  let component: StaffingServicesComponent;
  let fixture: ComponentFixture<StaffingServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffingServicesComponent]
    });
    fixture = TestBed.createComponent(StaffingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
