import { TestBed, ComponentFixture, fakeAsync, flush, async } from '@angular/core/testing';
import { BacklogComponent } from './backlog.component';
import { BacklogService } from '../../services/backlog.service';
import { MatDialog } from '@angular/material';
import { of, Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BacklogTaskComponent } from '../backlog-task/backlog-task.component';

describe('BacklogComponent', () => {

  let fixture: ComponentFixture<BacklogComponent>;
  let mockBacklogService;
  let mockMatDialog;
  let BACKLOG_TASKS;

  beforeEach(() => {
    BACKLOG_TASKS = [
      {id: 1, statusId: 1,  description: 'backlog task one'},
      {id: 2, statusId: 1,  description: 'backlog task two'}
    ];

    mockBacklogService = jasmine.createSpyObj(['loadBacklog', 'getActiveBacklogTasks']);
    mockMatDialog = jasmine.createSpyObj(['open', 'afterClosed']);

    TestBed.configureTestingModule({
      declarations: [BacklogComponent,
                     BacklogTaskComponent],
      providers: [
        {provide: BacklogService, useValue: mockBacklogService },
        {provide: MatDialog, useValue: mockMatDialog }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(BacklogComponent);
  });

  it('should create one backlog task for each active backlog task from the backlog service', () => {
    mockBacklogService.getActiveBacklogTasks.and.returnValue(of(BACKLOG_TASKS));
    fixture.detectChanges();
    fixture.componentInstance.backlogTasks.subscribe(data => {
      expect(data.length).toBe(2);
    });
    const backlogTasks = fixture.debugElement.queryAll(By.css('.backlog-task'));
    expect(backlogTasks.length).toBe(2);
    for (let i = 0; i < BACKLOG_TASKS.length; i++) {
      expect(backlogTasks[i].componentInstance.backlog).toEqual(BACKLOG_TASKS[i]);
    }
  });
});
