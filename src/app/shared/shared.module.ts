import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLinePipe } from './pipes/new-line.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NewLinePipe
  ],
  exports: [
    NewLinePipe
  ]
})
export class SharedModule { }
