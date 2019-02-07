import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { KanbanAppComponent } from './kanban-app.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BacklogTaskComponent } from './components/backlog-task/backlog-task.component';
import { NewBacklogTaskDialogComponent } from './components/new-backlog-task-dialog/new-backlog-task-dialog.component';
import { WorkflowTaskComponent } from './components/workflow-task/workflow-task.component';
import { GoalsComponent } from './components/goals/goals.component';
import { GoalDefinitionComponent } from './components/goal-definition/goal-definition.component';
import { NewGoalDefinitionDialogComponent } from './components/new-goal-definition-dialog/new-goal-definition-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationGuard } from '../core/authorization.guard';

const routes: Routes = [
  { path: '', component: KanbanAppComponent,
    children: [
      { path: 'backlog', component: BacklogComponent, canActivate: [AuthorizationGuard]},
      { path: 'workflow', component: WorkflowComponent, canActivate: [AuthorizationGuard]},
      { path: 'settings', component: SettingsComponent, canActivate: [AuthorizationGuard]},
      { path: 'goals', component: GoalsComponent, canActivate: [AuthorizationGuard] }
    ] },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [
    NewBacklogTaskDialogComponent,
    NewGoalDefinitionDialogComponent
  ],
  declarations: [KanbanAppComponent, ToolbarComponent, BacklogComponent, SidenavComponent, WorkflowComponent, SettingsComponent, BacklogTaskComponent, NewBacklogTaskDialogComponent, WorkflowTaskComponent, GoalsComponent, GoalDefinitionComponent, NewGoalDefinitionDialogComponent]
})
export class KanbanModule { }
