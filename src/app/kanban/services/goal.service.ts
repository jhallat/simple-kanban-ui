import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../models/goal';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status } from '../models/status';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private _activeGoals: BehaviorSubject<Goal[]>;

  private dataStore: {
    goals: Goal[];
    statuses: Status[];
  }

  constructor(private http: HttpClient, private statusService: StatusService) {
    this.dataStore = { goals: [],
                       statuses: [] };
    this._activeGoals = new BehaviorSubject<Goal[]>([]);
  }

  get activeGoals(): Observable<Goal[]> {
    return this._activeGoals.asObservable();
  }

  loadGoals() {
    this.statusService.getStatuses('goal').subscribe(statusData => {
      this.dataStore.statuses = statusData;
      const activeId = this.dataStore.statuses.find((item) => item.code === 'active').id;
      this.http.get<Goal[]>('http://localhost:8080/api/v1/goals').subscribe(goalData => {
        this.dataStore.goals = goalData;
        this._activeGoals.next(Object.assign({}, this.dataStore).goals.filter((item) => item.statusId === activeId));
      },
      err => console.log(err));
    },
    err => console.log(err));

  }

  addGoal(goal: Goal) {
    const activeId = this.dataStore.statuses.find((item) => item.code === 'active').id;
    goal.statusId = activeId;
    this.http.post<Goal>('http://localhost:8080/api/v1/goals', goal).subscribe(data => {
      this.dataStore.goals.push(data);
      this._activeGoals.next(Object.assign({}, this.dataStore).goals.filter((item) => item.statusId === activeId));
    });
  }

}
