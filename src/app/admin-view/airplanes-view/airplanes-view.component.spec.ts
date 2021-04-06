import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanesViewComponent } from './airplanes-view.component';

describe('AirplanesViewComponent', () => {
  let component: AirplanesViewComponent;
  let fixture: ComponentFixture<AirplanesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplanesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplanesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
