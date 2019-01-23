import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkflowStatus } from '../models/workflow-status';

@Injectable({
  providedIn: 'root'
})
export class WorkflowStatusService {

  constructor(private http: HttpClient) { }

  getWorkflowStatuses(): Observable<WorkflowStatus[]> {
    return this.http.get<WorkflowStatus[]>('http://localhost:8080/api/v1/workflow-statuses');
  }
}
