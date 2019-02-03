import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
              @Inject(MAT_DIALOG_DATA) private data: BacklogTask,
              private backlogService: BacklogService) { }


  ngOnInit() {
    this.backlogTask =  this.data ? this.data :  new BacklogTask();
  }

  add() {
    //TODO remove this service call
     this.backlogService.addBacklogTask(this.backlogTask);
     this.dialogRef.close(this.backlogTask);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
