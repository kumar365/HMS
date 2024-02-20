import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAmbulanceComponent } from './search-ambulance.component';

describe('SearchAmbulanceComponent', () => {
  let component: SearchAmbulanceComponent;
  let fixture: ComponentFixture<SearchAmbulanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAmbulanceComponent]
    });
    fixture = TestBed.createComponent(SearchAmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
