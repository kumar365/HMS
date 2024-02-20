import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSurgeonsComponent } from './find-surgeons.component';

describe('FindSurgeonsComponent', () => {
  let component: FindSurgeonsComponent;
  let fixture: ComponentFixture<FindSurgeonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindSurgeonsComponent]
    });
    fixture = TestBed.createComponent(FindSurgeonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
