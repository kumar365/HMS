import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentComponent } from './dependent.component';

describe('DependentComponent', () => {
  let component: DependentComponent;
  let fixture: ComponentFixture<DependentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependentComponent]
    });
    fixture = TestBed.createComponent(DependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
