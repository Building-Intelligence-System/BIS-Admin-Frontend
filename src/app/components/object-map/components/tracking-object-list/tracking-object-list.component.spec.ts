import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingObjectListComponent } from './tracking-object-list.component';

describe('TrackingObjectListComponent', () => {
  let component: TrackingObjectListComponent;
  let fixture: ComponentFixture<TrackingObjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingObjectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingObjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
