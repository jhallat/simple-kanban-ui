import { Component, OnInit, Input } from '@angular/core';
import { Goal } from '../../models/goal';

@Component({
  selector: 'app-goal-definition',
  templateUrl: './goal-definition.component.html',
  styleUrls: ['./goal-definition.component.scss']
})
export class GoalDefinitionComponent implements OnInit {

  @Input() goal: Goal;
  constructor() { }

  ngOnInit() {
  }

}
