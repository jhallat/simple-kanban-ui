import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAuthorization } from '../kanban/models/user-authorization';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userAuthorization = new UserAuthorization;

  get userAuthorization() {
    return this._userAuthorization;
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<UserAuthorization> {
    const API_URL = `${environment.api_url}/api/v1/user/login`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<UserAuthorization>(API_URL,
      { username: username, password: password},
        httpOptions).pipe(
          tap(resp => {
            Object.assign(this._userAuthorization, resp);
            localStorage.setItem('bearerToken',
            this._userAuthorization.bearerToken);
          }));
  }

  logout(): void {

  }

  authenticate(credentials, callback) {



  }


}
