import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthorization } from 'src/app/kanban/models/user-authorization';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userAuthorization: UserAuthorization;
  returnUrl: string;
  credentials = {username: '', password: '', keepLoggedIn: false};
  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  login() {
    this.authService.login(this.credentials.username,
      this.credentials.password, this.credentials.keepLoggedIn).subscribe(
        resp => {
          this.userAuthorization = resp;
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        },
        () => {
          this.userAuthorization = new UserAuthorization();
        }
    );
  }

}
