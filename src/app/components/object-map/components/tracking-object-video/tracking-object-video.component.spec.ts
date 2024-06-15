import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingObjectVideoComponent } from './tracking-object-video.component';

describe('TrackingObjectVideoComponent', () => {
  let component: TrackingObjectVideoComponent;
  let fixture: ComponentFixture<TrackingObjectVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingObjectVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingObjectVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
