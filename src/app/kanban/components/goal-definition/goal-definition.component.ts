import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Goal } from '../../models/goal';

@Component({
  selector: 'app-goal-definition',
  templateUrl: './goal-definition.component.html',
  styleUrls: ['./goal-definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalDefinitionComponent implements OnInit {

  @Input() goal: Goal;
  @Output() editGoal = new EventEmitter<Goal>();
  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.editGoal.emit(this.goal);
  }

}
