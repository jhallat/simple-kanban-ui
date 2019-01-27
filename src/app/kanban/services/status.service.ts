import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatuses(category: string): Observable<Status[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<Status[]>('http://localhost:8080/api/v1/statuses', { params: params});
  }
}
