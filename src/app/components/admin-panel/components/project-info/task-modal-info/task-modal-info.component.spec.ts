import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalInfoComponent } from './task-modal-info.component';

describe('TaskModalInfoComponent', () => {
  let component: TaskModalInfoComponent;
  let fixture: ComponentFixture<TaskModalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
