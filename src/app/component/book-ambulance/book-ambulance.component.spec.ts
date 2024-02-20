import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAmbulanceComponent } from './book-ambulance.component';

describe('BookAmbulanceComponent', () => {
  let component: BookAmbulanceComponent;
  let fixture: ComponentFixture<BookAmbulanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookAmbulanceComponent]
    });
    fixture = TestBed.createComponent(BookAmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
