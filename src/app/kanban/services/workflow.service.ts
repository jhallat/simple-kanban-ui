import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkflowTask } from '../models/workflow-task';
import { WorkflowStatus } from '../models/workflow-status';
import { HttpClient } from '@angular/common/http';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  private _readyWorkflowTasks: BehaviorSubject<WorkflowTask[]>;
  private _inProgressWorkflowTasks: BehaviorSubject<WorkflowTask[]>;
  private _doneWorkflowTasks: BehaviorSubject<WorkflowTask[]>;

  private _readyStatusId = 0;
  private _inProgressStatusId = 0;
  private _doneStatusId = 0;

  private dataStore: {
    workflowTasks: WorkflowTask[];
    workflowStatuses: WorkflowStatus[];
  };

  constructor(private http: HttpClient,
              private statusService: StatusService) {
    this.dataStore = { workflowTasks: [], workflowStatuses: [] };
    this._readyWorkflowTasks = new BehaviorSubject<WorkflowTask[]>([]);
    this._inProgressWorkflowTasks = new BehaviorSubject<WorkflowTask[]>([]);
    this._doneWorkflowTasks = new BehaviorSubject<WorkflowTask[]>([]);
   }

   get readyWorkflowTasks(): Observable<WorkflowTask[]> {
     return this._readyWorkflowTasks.asObservable();
   }

   get inProgressWorkflowTasks(): Observable<WorkflowTask[]> {
    return this._inProgressWorkflowTasks.asObservable();
  }

  get doneWorkflowTasks(): Observable<WorkflowTask[]> {
    return this._doneWorkflowTasks.asObservable();
  }

  loadWorkflow() {
    this.statusService.getStatuses('workflow').subscribe(statusData => {
      this.dataStore.workflowStatuses = statusData;
      this._readyStatusId = this.dataStore.workflowStatuses.find((item) => item.code === 'ready').id;
      this._inProgressStatusId = this.dataStore.workflowStatuses.find((item) => item.code === 'inprogress').id;
      this._doneStatusId = this.dataStore.workflowStatuses.find((item) => item.code === 'done').id;
      this.http.get<WorkflowTask[]>('http://localhost:8080/api/v1/workflow-tasks').subscribe(workflowData => {
        this.dataStore.workflowTasks = workflowData;
        this._readyWorkflowTasks.next(Object.assign({},
          this.dataStore).workflowTasks.filter((item) => item.statusId === this._readyStatusId));
        this._inProgressWorkflowTasks.next(Object.assign({},
          this.dataStore).workflowTasks.filter((item) => item.statusId === this._inProgressStatusId));
        this._doneWorkflowTasks.next(Object.assign({},
          this.dataStore).workflowTasks.filter((item) => item.statusId === this._doneStatusId));
      });
    });
  }

  move(workflowTask: WorkflowTask, code: string) {

    switch (code) {
      case 'ready': {
        workflowTask.statusId = this._readyStatusId;
        break;
      }
      case 'inprogress': {
        workflowTask.statusId = this._inProgressStatusId;
        break;
      }
      case 'done': {
        workflowTask.statusId = this._doneStatusId;
        break;
      }
    }

    this.http.put<WorkflowTask[]>(`http://localhost:8080/api/v1/workflow-tasks/${workflowTask.id}`, workflowTask).subscribe(data => {
      this.dataStore.workflowTasks = data;
      this._readyWorkflowTasks.next(Object.assign({},
        this.dataStore).workflowTasks.filter((item) => item.statusId === this._readyStatusId));
      this._inProgressWorkflowTasks.next(Object.assign({},
        this.dataStore).workflowTasks.filter((item) => item.statusId === this._inProgressStatusId));
      this._doneWorkflowTasks.next(Object.assign({},
        this.dataStore).workflowTasks.filter((item) => item.statusId === this._doneStatusId));
    });
  }
}
