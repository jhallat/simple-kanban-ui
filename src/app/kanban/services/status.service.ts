import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/status';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from 'src/app/core/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.api_url;
  }

  getStatuses(category: string): Observable<Status[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<Status[]>(`${this.API_URL}/api/v1/statuses`,
                                    { params: params });
  }
}
