import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAmbulancesComponent } from './view-ambulances.component';

describe('ViewAmbulancesComponent', () => {
  let component: ViewAmbulancesComponent;
  let fixture: ComponentFixture<ViewAmbulancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAmbulancesComponent]
    });
    fixture = TestBed.createComponent(ViewAmbulancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
