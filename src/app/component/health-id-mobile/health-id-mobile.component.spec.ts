import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthIdMobileComponent } from './health-id-mobile.component';

describe('HealthIdMobileComponent', () => {
  let component: HealthIdMobileComponent;
  let fixture: ComponentFixture<HealthIdMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthIdMobileComponent]
    });
    fixture = TestBed.createComponent(HealthIdMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
