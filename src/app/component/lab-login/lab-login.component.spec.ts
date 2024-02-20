import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabLoginComponent } from './lab-login.component';

describe('LabLoginComponent', () => {
  let component: LabLoginComponent;
  let fixture: ComponentFixture<LabLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabLoginComponent]
    });
    fixture = TestBed.createComponent(LabLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
