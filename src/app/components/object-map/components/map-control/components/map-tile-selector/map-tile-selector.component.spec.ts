import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTileSelectorComponent } from './map-tile-selector.component';

describe('MapTileSelectorComponent', () => {
  let component: MapTileSelectorComponent;
  let fixture: ComponentFixture<MapTileSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapTileSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapTileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
