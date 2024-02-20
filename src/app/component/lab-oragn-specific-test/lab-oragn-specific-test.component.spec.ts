import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabOragnSpecificTestComponent } from './lab-oragn-specific-test.component';

describe('LabOragnSpecificTestComponent', () => {
  let component: LabOragnSpecificTestComponent;
  let fixture: ComponentFixture<LabOragnSpecificTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabOragnSpecificTestComponent]
    });
    fixture = TestBed.createComponent(LabOragnSpecificTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
