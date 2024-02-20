import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantsPanelComponent } from './consultants-panel.component';

describe('ConsultantsPanelComponent', () => {
  let component: ConsultantsPanelComponent;
  let fixture: ComponentFixture<ConsultantsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultantsPanelComponent]
    });
    fixture = TestBed.createComponent(ConsultantsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
