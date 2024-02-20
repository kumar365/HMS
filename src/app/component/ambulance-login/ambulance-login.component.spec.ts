import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceLoginComponent } from './ambulance-login.component';

describe('AmbulanceLoginComponent', () => {
  let component: AmbulanceLoginComponent;
  let fixture: ComponentFixture<AmbulanceLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbulanceLoginComponent]
    });
    fixture = TestBed.createComponent(AmbulanceLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
