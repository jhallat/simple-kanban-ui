import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthorizationGuard } from './core/authorization.guard';
import { HttpInterceptorModule } from './core/http-interceptor';


const routes: Routes = [
  { path: 'kanban', loadChildren: './kanban/kanban.module#KanbanModule', canActivate: [AuthorizationGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'kanban'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    HttpClientModule,
    HttpInterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
