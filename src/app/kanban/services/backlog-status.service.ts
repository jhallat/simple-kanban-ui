import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BacklogStatus } from '../models/backlog-status';

@Injectable({
  providedIn: 'root'
})
export class BacklogStatusService {

  constructor(private http: HttpClient) { }

  getBacklogStatuses(): Observable<BacklogStatus[]> {
    return this.http.get<BacklogStatus[]>('http://localhost:8080/api/v1/backlog-statuses');
  }
}
