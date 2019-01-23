import { Component, OnInit, Input } from '@angular/core';
import { BacklogTask } from '../../models/backlog-task';
import { BacklogService } from '../../services/backlog.service';

@Component({
  selector: 'app-backlog-task',
  templateUrl: './backlog-task.component.html',
  styleUrls: ['./backlog-task.component.scss']
})
export class BacklogTaskComponent implements OnInit {

  @Input() backlogTask: BacklogTask;
  constructor(private backlogService: BacklogService) { }

  ngOnInit() {
  }

  sendToWorkflow() {
    // TODO should this be done here or at the parent level??
    this.backlogService.sendTaskToWorkflow(this.backlogTask);
  }

  delete() {
    // TODO should this be done here or at the parent level??
    this.backlogService.deleteBacklogTask(this.backlogTask);
  }
}
