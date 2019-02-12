import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAuthorization } from '../kanban/models/user-authorization';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'projects/logger/src/lib/logger';
import { LoggerFactoryService } from 'projects/logger/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _logger: Logger;
  private _userAuthorization;

  get userAuthorization() {
    this._logger.debug('getting authorization');
    if (this._userAuthorization) {
      this._logger.debug('return authorization');
      return this._userAuthorization;
    } else {
      this._userAuthorization = JSON.parse(localStorage.getItem('user'));
      return this._userAuthorization ? this._userAuthorization : new UserAuthorization();
    }
  }

  constructor(private http: HttpClient,
              private loggerFactory: LoggerFactoryService) {
    this._logger = this.loggerFactory.createLogger('AuthenticationService');
  }

  login(username: string, password: string, keepLoggedIn: boolean): Observable<UserAuthorization> {
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
            this._logger.debug(`authenticated = ${resp.authenticated}`);
            this._userAuthorization = new UserAuthorization();
            Object.assign(this._userAuthorization, resp);
            localStorage.setItem('bearerToken', this._userAuthorization.bearerToken);
            this._logger.debug('bearerToken set to local storage');
            if (keepLoggedIn) {
              this._logger.debug('keep logged in');
              localStorage.setItem('user', JSON.stringify(this._userAuthorization));
            }
          }, err => {
            this._logger.error(err);
          }));
  }

  logout(): void {
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('user');
  }

  authenticate(credentials, callback) {



  }


}
