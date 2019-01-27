import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BacklogTaskComponent } from './backlog-task.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BacklogService } from '../../services/backlog.service';

describe('BacklogTaskComponent', () => {

  let fixture: ComponentFixture<BacklogTaskComponent>;
  let mockBacklogService;

  beforeEach(() => {
    mockBacklogService = jasmine.createSpyObj(['sendTaskToWorkflow', 'deleteBacklogTask']);
    TestBed.configureTestingModule({
      declarations: [BacklogTaskComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: BacklogService, useValue: mockBacklogService }
      ]
    });
    fixture = TestBed.createComponent(BacklogTaskComponent);
  });

  it('should render the description of the backlog item', () => {
    fixture.componentInstance.backlogTask = {id: 1, statusId: 1, description: 'The backlog test'};
    fixture.detectChanges();
    const backlogContent = fixture.debugElement.query(By.css('.backlog-content'));
    expect(backlogContent.nativeElement.textContent).toContain('The backlog test');
  });
});
