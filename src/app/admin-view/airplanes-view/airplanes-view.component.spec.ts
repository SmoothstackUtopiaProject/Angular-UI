import { AirplanesService } from './../../service/airplanes/airplanes.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanesViewComponent } from './airplanes-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('AirplanesViewComponent', () => {
  let component: AirplanesViewComponent;
  let fixture: ComponentFixture<AirplanesViewComponent>;
  let service : AirplanesService;
  let spy : any;

  let fakeAirplanes = [
    {
        "airplaneId": 21,
        "airplaneTypeId": 10
    },
    {
        "airplaneId": 23,
        "airplaneTypeId": 11
    },
    {
        "airplaneId": 24,
        "airplaneTypeId": 11
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplanesViewComponent ],
      imports: [HttpClientTestingModule],
      providers: [FormBuilder, AirplanesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplanesViewComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AirplanesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should request for airplanes', () => {
    spy = spyOn(component, 'getAllAirplanes');
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  })

  it('should store airplanes in component on start', () => {
    spyOn(service, 'getAllAirplanes').and.returnValue(of(fakeAirplanes));
    component.ngOnInit();
    expect(component.airplaneList.length).toEqual(3);
  })
});
