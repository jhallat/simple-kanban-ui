import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { NewLinePipe } from './pipes/new-line.pipe';
import { StarInputComponent } from './components/star-input/star-input.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    NewLinePipe,
    StarInputComponent
  ],
  exports: [
    NewLinePipe,
    StarInputComponent
  ]
})
export class SharedModule { }
