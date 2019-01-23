import { Component, OnInit, Input } from '@angular/core';
import { WorkflowTask } from '../../models/workflow-task';

@Component({
  selector: 'app-workflow-task',
  templateUrl: './workflow-task.component.html',
  styleUrls: ['./workflow-task.component.scss']
})
export class WorkflowTaskComponent implements OnInit {

  @Input() workflowTask: WorkflowTask;
  constructor() { }

  ngOnInit() {
  }

}
