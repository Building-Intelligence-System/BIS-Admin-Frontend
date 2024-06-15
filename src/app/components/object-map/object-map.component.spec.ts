import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectMapComponent } from './object-map.component';

describe('ObjectMapComponent', () => {
  let component: ObjectMapComponent;
  let fixture: ComponentFixture<ObjectMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
