import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { MatDialog } from '@angular/material';
import { NewGoalDefinitionDialogComponent } from '../new-goal-definition-dialog/new-goal-definition-dialog.component';
import { Observable } from 'rxjs';
import { Goal } from '../../models/goal';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  goals: Observable<Goal[]>;

  constructor(private goalService: GoalService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.goalService.loadGoals();
    this.goals = this.goalService.activeGoals;
  }

  openNewGoalDefinitionDialog() {
    const dialogRef = this.dialog.open(NewGoalDefinitionDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goals = this.goalService.activeGoals;
      }
    });

  }

}
