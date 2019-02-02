import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../models/goal';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status } from '../models/status';
import { StatusService } from './status.service';
import { environment } from '../../../environments/environment';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private _activeGoals: BehaviorSubject<Goal[]>;
  private API_URL: string;

  private dataStore: {
    goals: Goal[];
    statuses: Status[];
    statusById: Map<number, Status>;
  };



  constructor(private http: HttpClient, private statusService: StatusService) {
    this.dataStore = { goals: [],
                       statuses: [],
                       statusById: new Map<number, Status>() };
    this._activeGoals = new BehaviorSubject<Goal[]>([]);
    this.API_URL = environment.api_url;
  }

  get activeGoals(): Observable<Goal[]> {
    return this._activeGoals.asObservable();
  }

  get statuses(): Observable<Status[]> {
    return this.statusService.getStatuses('goal');
  }

  loadGoals() {
    this.statusService.getStatuses('goal').subscribe(statusData => {
      this.dataStore.statusById = new Map<number, Status>(statusData.map(status => [status.id, status] as [number, Status]));
      this.dataStore.statuses = statusData;
      this.http.get<Goal[]>(`${this.API_URL}/api/v1/goals`).subscribe(goalData => {
        this.dataStore.goals = goalData;
        this._activeGoals.next(Object.assign({}, this.dataStore)
        .goals.filter((item) => this.dataStore.statusById.get(item.statusId).code !== 'cancelled'));
      },
      err => console.log(err));
    },
    err => console.log(err));

  }

  addGoal(goal: Goal) {
    this.http.post<Goal>(`${this.API_URL}/api/v1/goals`, goal).subscribe(data => {
      this.dataStore.goals.push(data);
      this._activeGoals.next(Object.assign({}, this.dataStore)
      .goals.filter((item) => this.dataStore.statusById.get(item.statusId).code !== 'cancelled'));
      });
  }

  updateGoal(goal: Goal) {
    this.http.put<Goal>(`${this.API_URL}/api/v1/goals/${goal.id}`, goal).subscribe(data => {
      const index = this.dataStore.goals.findIndex((item) => item.id === goal.id);
      if (index >= 0) {
        this.dataStore.goals[index] = data;
      }
      this._activeGoals.next(Object.assign({}, this.dataStore)
      .goals.filter((item) => this.dataStore.statusById.get(item.statusId).code !== 'cancelled'));
    });
  }

}
