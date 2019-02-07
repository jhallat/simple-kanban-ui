import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { NewLinePipe } from './pipes/new-line.pipe';
import { StarInputComponent } from './components/star-input/star-input.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    NewLinePipe,
    StarInputComponent,
    LoginComponent
  ],
  exports: [
    NewLinePipe,
    StarInputComponent,
    LoginComponent
  ]
})
export class SharedModule { }
