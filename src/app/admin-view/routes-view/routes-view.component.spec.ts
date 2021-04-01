import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesViewComponent } from './routes-view.component';

describe('RoutesViewComponent', () => {
  let component: RoutesViewComponent;
  let fixture: ComponentFixture<RoutesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
