import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingObjectInfoComponent } from './tracking-object-info.component';

describe('TrackingObjectInfoComponent', () => {
  let component: TrackingObjectInfoComponent;
  let fixture: ComponentFixture<TrackingObjectInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingObjectInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingObjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
