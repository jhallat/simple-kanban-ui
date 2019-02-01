import { Component, OnInit, Inject } from '@angular/core';
import { Goal } from '../../models/goal';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-new-goal-definition-dialog',
  templateUrl: './new-goal-definition-dialog.component.html',
  styleUrls: ['./new-goal-definition-dialog.component.scss']
})
export class NewGoalDefinitionDialogComponent implements OnInit {

  goal: Goal;
  constructor(private dialogRef: MatDialogRef<NewGoalDefinitionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Goal) {
  }

  ngOnInit() {
    if (this.data) {
      this.goal = this.data;
    } else {
      this.goal = new Goal();
    }
  }

  assignPriority(priority: number) {
    this.goal.priority = priority;
  }

  save() {
    // TODO remove service from dialog
    console.log(this.goal);
    this.dialogRef.close(this.goal);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
