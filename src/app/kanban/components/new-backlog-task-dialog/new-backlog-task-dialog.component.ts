import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BacklogTask } from '../../models/backlog-task';
import { BacklogService } from '../../services/backlog.service';

@Component({
  selector: 'app-new-backlog-task-dialog',
  templateUrl: './new-backlog-task-dialog.component.html',
  styleUrls: ['./new-backlog-task-dialog.component.scss']
})
export class NewBacklogTaskDialogComponent implements OnInit {

  backlogTask: BacklogTask;
  constructor(private dialogRef: MatDialogRef<NewBacklogTaskDialogComponent>,
              private backlogService: BacklogService) { }


  ngOnInit() {
    this.backlogTask = new BacklogTask();
  }

  add() {
     this.backlogService.addBacklogTask(this.backlogTask);
     this.dialogRef.close(this.backlogTask);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
