import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBacklogTaskDialogComponent } from './new-backlog-task-dialog.component';

describe('NewBacklogTaskDialogComponent', () => {
  let component: NewBacklogTaskDialogComponent;
  let fixture: ComponentFixture<NewBacklogTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBacklogTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBacklogTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
