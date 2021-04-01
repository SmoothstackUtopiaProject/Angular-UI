import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsViewComponent } from './airports-view.component';

describe('AirportsViewComponent', () => {
  let component: AirportsViewComponent;
  let fixture: ComponentFixture<AirportsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
