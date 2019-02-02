import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Goal } from '../../models/goal';
import { Status } from '../../models/status';

@Component({
  selector: 'app-goal-definition',
  templateUrl: './goal-definition.component.html',
  styleUrls: ['./goal-definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalDefinitionComponent implements OnInit {

  @Input() goal: Goal;
  @Input() maximumPriority: number;
  @Input() statusById: Map<number, Status>;
  @Output() editGoal = new EventEmitter<Goal>();
  constructor() { }

  ngOnInit() {
    console.log(this.statusById);
  }

  edit() {
     this.editGoal.emit(this.goal);
  }

}
