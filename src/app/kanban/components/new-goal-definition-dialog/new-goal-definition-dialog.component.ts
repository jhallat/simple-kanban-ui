import { Component, OnInit } from '@angular/core';
import { Goal } from '../../models/goal';
import { MatDialogRef } from '@angular/material';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-new-goal-definition-dialog',
  templateUrl: './new-goal-definition-dialog.component.html',
  styleUrls: ['./new-goal-definition-dialog.component.scss']
})
export class NewGoalDefinitionDialogComponent implements OnInit {

  goal: Goal;
  constructor(private dialogRef: MatDialogRef<NewGoalDefinitionDialogComponent>,
              private goalService: GoalService) { }

  ngOnInit() {
    this.goal = new Goal();
  }

  add() {
    this.goalService.addGoal(this.goal);
    this.dialogRef.close(this.goal);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
