import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingObjectComponent } from './tracking-object.component';

describe('TrackingObjectComponent', () => {
  let component: TrackingObjectComponent;
  let fixture: ComponentFixture<TrackingObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingObjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
