import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthIdCreationComponent } from './health-id-creation.component';

describe('HealthIdCreationComponent', () => {
  let component: HealthIdCreationComponent;
  let fixture: ComponentFixture<HealthIdCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthIdCreationComponent]
    });
    fixture = TestBed.createComponent(HealthIdCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
