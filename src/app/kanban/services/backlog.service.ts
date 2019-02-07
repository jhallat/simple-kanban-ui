import { Injectable } from '@angular/core';
import { BacklogTask } from '../models/backlog-task';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BacklogStatus } from '../models/backlog-status';
import { StatusService } from './status.service';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from 'src/app/core/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {

  private API_URL;
  private _activeBacklogTasks:  BehaviorSubject<BacklogTask[]>;

  private dataStore: {
    backlogTasks: BacklogTask[];
    backlogStatuses: BacklogStatus[];
  };

  constructor(private http: HttpClient,
              private statusService: StatusService) {
    this.dataStore = { backlogTasks: [], backlogStatuses: [] };
    this._activeBacklogTasks = new BehaviorSubject<BacklogTask[]>([]);
    this.API_URL = environment.api_url;
  }

  get activeBacklogTasks(): Observable<BacklogTask[]> {
    return this._activeBacklogTasks.asObservable();
  }

  loadBacklog() {
    this.statusService.getStatuses('backlog').subscribe(statusData => {
      this.dataStore.backlogStatuses = statusData;

      this.http.get<BacklogTask[]>(`${this.API_URL}/api/v1/backlog-tasks`).subscribe(backlogData => {
        this.dataStore.backlogTasks = backlogData;
        this._activeBacklogTasks.next(Object.assign({}, this.dataStore).backlogTasks.filter((item) => item.statusId === 1));
      },
      err => console.log(err));
    },
    err => console.log(err));
  }

  addBacklogTask(backlogTask: BacklogTask)  {
    let activeStatusId = this.dataStore.backlogStatuses.find((item) => item.code === 'active').id;
    if (!activeStatusId) {
      // TODO Should throw an error in this case
      activeStatusId = 0;
    }
    backlogTask.statusId = activeStatusId;
    this.http.post<BacklogTask>(`${this.API_URL}/api/v1/backlog-tasks`, backlogTask).subscribe(data => {
      this.dataStore.backlogTasks.push(data);
      this._activeBacklogTasks.next(Object.assign({}, this.dataStore).backlogTasks.filter((item) => item.statusId === 1));
    });

  }

  deleteBacklogTask(backlogTask: BacklogTask) {
    let cancelledStatusId = this.dataStore.backlogStatuses.find((item) => item.code === 'cancelled').id;
    if (!cancelledStatusId) {
      // TODO Should throw an error in this case
      cancelledStatusId = 0;
    }
    backlogTask.statusId = cancelledStatusId;
    this.http.put<BacklogTask>(`${this.API_URL}/api/v1/backlog-tasks/${backlogTask.id}`, backlogTask).subscribe(data => {
      this.dataStore.backlogTasks.push(data);
      this._activeBacklogTasks.next(Object.assign({}, this.dataStore).backlogTasks.filter((item) => item.statusId === 1));
    });
  }

  sendTaskToWorkflow(backlogTask: BacklogTask) {
    let workflowStatusId = this.dataStore.backlogStatuses.find((item) => item.code === 'workflow').id;
    if (!workflowStatusId) {
      // TODO Should throw an error in this case
      workflowStatusId = 0;
    }
    backlogTask.statusId = workflowStatusId;
    this.http.put<BacklogTask>(`${this.API_URL}/api/v1/backlog-tasks/${backlogTask.id}`, backlogTask).subscribe(data => {
      this.dataStore.backlogTasks.push(data);
      this._activeBacklogTasks.next(Object.assign({}, this.dataStore).backlogTasks.filter((item) => item.statusId === 1));
    });
  }

}
