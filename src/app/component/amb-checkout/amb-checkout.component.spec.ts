import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbCheckoutComponent } from './amb-checkout.component';

describe('AmbCheckoutComponent', () => {
  let component: AmbCheckoutComponent;
  let fixture: ComponentFixture<AmbCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbCheckoutComponent]
    });
    fixture = TestBed.createComponent(AmbCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
