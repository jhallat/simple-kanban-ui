import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../services/backlog.service';
import { BacklogTask } from '../../models/backlog-task';
import { MatDialog } from '@angular/material';
import { NewBacklogTaskDialogComponent } from '../new-backlog-task-dialog/new-backlog-task-dialog.component';
import { Observable } from 'rxjs';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../models/goal';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  backlogTasks: Map<number, BacklogTask[]>;
  activeGoals: Goal[];

  constructor(private backlogService: BacklogService,
              private goalService: GoalService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.goalService.loadGoals();
    this.goalService.statuses.subscribe(statusData => {
      const activeId = statusData.find(status => status.code === 'active').statusId;
      this.goalService.activeGoals.subscribe(data => {
        this.activeGoals = data.filter((goal) => goal.statusId === activeId).sort((a, b) => b.priority - a.priority);
        this.backlogService.loadBacklog();
        this.backlogService.activeBacklogTasks.subscribe(backlogData => {
          this.updateBacklogTasks(backlogData);
        });
      });
    });
  }

  openNewBacklogTaskDialog(goalId: number) {
    const backlogTask = new BacklogTask();
    backlogTask.goalId = goalId;

    let dialogRef = this.dialog.open(NewBacklogTaskDialogComponent, {
      width: '450px',
      data: backlogTask
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backlogService.activeBacklogTasks.subscribe(data =>
          this.updateBacklogTasks(data));
      }
    });
  }

  updateBacklogTasks(backlogTasks: BacklogTask[]) {
    const buildMap = new Map<number, BacklogTask[]>();
    for (let i = 0; i < backlogTasks.length; i++) {
      if (!buildMap.has(backlogTasks[i].goalId)) {
        buildMap.set(backlogTasks[i].goalId, []);
      }
      buildMap.get(backlogTasks[i].goalId).push(backlogTasks[i]);
    }
    this.backlogTasks = buildMap;
  }

 }
