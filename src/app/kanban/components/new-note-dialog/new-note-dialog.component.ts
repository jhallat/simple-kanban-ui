import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../../models/note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.scss']
})
export class NewNoteDialogComponent implements OnInit {

  note: Note;
  constructor(
    private dialogRef: MatDialogRef<NewNoteDialogComponent>,
       @Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    if (this.data) {
      this.note = this.data.note ? this.data.note : new Note();
    } else {
      this.data.note = new Note();
    }
  }

  save() {
    this.dialogRef.close(this.note);
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
