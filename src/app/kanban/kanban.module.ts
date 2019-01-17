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

const routes: Routes = [
  { path: '', component: KanbanAppComponent,
    children: [
      { path: 'backlog', component: BacklogComponent},
      { path: 'workflow', component: WorkflowComponent},
      { path: 'settings', component: SettingsComponent}
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
  declarations: [KanbanAppComponent, ToolbarComponent, BacklogComponent, SidenavComponent, WorkflowComponent, SettingsComponent]
})
export class KanbanModule { }
