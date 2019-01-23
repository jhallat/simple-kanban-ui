import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkflowTask } from '../../models/workflow-task';
import { WorkflowService } from '../../services/workflow.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  readyWorkflowTasks: Observable<WorkflowTask[]>;
  inProgressWorkflowTasks: Observable<WorkflowTask[]>;
  doneWorkflowTasks: Observable<WorkflowTask[]>;

  constructor(private workflowService: WorkflowService) { }

  ngOnInit() {
    this.workflowService.loadWorkflow();
    this.readyWorkflowTasks = this.workflowService.readyWorkflowTasks;
    this.inProgressWorkflowTasks = this.workflowService.inProgressWorkflowTasks;
    this.doneWorkflowTasks = this.workflowService.doneWorkflowTasks;
  }

  drop(event: CdkDragDrop<WorkflowTask>) {

    console.log(`previous ${event.previousContainer.id}`);
    console.log(`next ${event.container.id}`);
    if (event.container.id !== event.previousContainer.id) {
        const forCompiler = <unknown>event.previousContainer.data;
        const worKflowObserver = <Observable<WorkflowTask[]>>forCompiler;
        const subsription = worKflowObserver.subscribe(data => {
          this.workflowService.move(data[event.previousIndex], event.container.id);
        });
        subsription.unsubscribe();
    }
  }
}
