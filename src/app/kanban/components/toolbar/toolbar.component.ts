import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  loggedIn: boolean;
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loggedIn = this.authenticationService.isAuthenticated;
  }


  logout() {
    this.authenticationService.logout();
  }
}
