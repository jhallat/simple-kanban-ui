import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { LoggerFactoryService, Logger } from 'projects/logger/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  private _logger: Logger;

  constructor(private authenticationService: AuthenticationService,
              private loggerFactory: LoggerFactoryService,
              private router: Router) {
    this._logger = loggerFactory.createLogger('AuthorizationGuard');
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._logger.debug(this.authenticationService.userAuthorization.username);
    if (this.authenticationService.userAuthorization.authenticated) {
      return true;
    } else {
      this.router.navigate(['login'],
      { queryParams: { returnUrl: state.url}});
    }
  }
}
