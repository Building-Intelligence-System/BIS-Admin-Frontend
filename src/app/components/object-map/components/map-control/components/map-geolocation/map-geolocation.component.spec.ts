import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGeolocationComponent } from './map-geolocation.component';

describe('MapGeolocationComponent', () => {
  let component: MapGeolocationComponent;
  let fixture: ComponentFixture<MapGeolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapGeolocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
