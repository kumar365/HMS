import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSocialComponent } from './register-social.component';

describe('RegisterSocialComponent', () => {
  let component: RegisterSocialComponent;
  let fixture: ComponentFixture<RegisterSocialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterSocialComponent]
    });
    fixture = TestBed.createComponent(RegisterSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
