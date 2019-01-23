import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../services/backlog.service';
import { BacklogTask } from '../../models/backlog-task';
import { MatDialog } from '@angular/material';
import { NewBacklogTaskDialogComponent } from '../new-backlog-task-dialog/new-backlog-task-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  backlogTasks: Observable<BacklogTask[]>;

  constructor(private backlogService: BacklogService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.backlogService.loadBacklog();
    this.backlogTasks = this.backlogService.activeBacklogTasks;
  }

  openNewBacklogTaskDialog() {
    let dialogRef = this.dialog.open(NewBacklogTaskDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backlogTasks = this.backlogService.activeBacklogTasks;
      }
    });
  }
 }
