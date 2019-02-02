import { Component, OnInit, Input } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { MatDialog } from '@angular/material';
import { NewGoalDefinitionDialogComponent } from '../new-goal-definition-dialog/new-goal-definition-dialog.component';
import { Observable } from 'rxjs';
import { Goal } from '../../models/goal';
import { Status } from '../../models/status';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  MAXIMUM_PRIORITY = 5;
  goals: Observable<Goal[]>;

  private _statuses: Status[];
  private _statusById: Map<number, Status>;
  constructor(private goalService: GoalService,
              private dialog: MatDialog) { }

  get statuses(): Status[] {
    return this._statuses;
  }

  get statusById(): Map<number, Status> {
    return this._statusById;
  }

  ngOnInit() {
    this.goalService.loadGoals();
    this.goals = this.goalService.activeGoals;
    this.goalService.statuses.subscribe(data => {
      this._statuses = data;
      this._statusById = new Map<number, Status>(this._statuses.map(status => [status.id, status] as [number, Status]));
    });
  }

  openNewGoalDefinitionDialog() {
    const initialStatusId = this._statuses.find((status) => status.initial).id;
    const goal = new Goal();
    goal.statusId = initialStatusId;
    const dialogRef = this.dialog.open(NewGoalDefinitionDialogComponent, {
      width: '600px',
      data: { goal: goal, statuses: this._statuses}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goalService.addGoal(result);
        this.goals = this.goalService.activeGoals;
      }
    });

  }

  edit(goal: Goal) {
    const dialogRef = this.dialog.open(NewGoalDefinitionDialogComponent, {
      width: '600px',
      data: { goal: goal,
              statuses: this._statuses }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goalService.updateGoal(result);
        this.goals = this.goalService.activeGoals;
      }
    });
  }

}
