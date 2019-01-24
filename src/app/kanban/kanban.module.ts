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

const routes: Routes = [
  { path: '', component: KanbanAppComponent,
    children: [
      { path: 'backlog', component: BacklogComponent},
      { path: 'workflow', component: WorkflowComponent},
      { path: 'settings', component: SettingsComponent},
      { path: 'goals', component: GoalsComponent }
    ] },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    NewBacklogTaskDialogComponent
  ],
  declarations: [KanbanAppComponent, ToolbarComponent, BacklogComponent, SidenavComponent, WorkflowComponent, SettingsComponent, BacklogTaskComponent, NewBacklogTaskDialogComponent, WorkflowTaskComponent, GoalsComponent]
})
export class KanbanModule { }
