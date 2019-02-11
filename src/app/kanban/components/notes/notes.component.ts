import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../models/note';
import { Status } from '../../models/status';
import { NoteService } from '../../services/note.service';
import { MatDialog } from '@angular/material';
import { NewNoteDialogComponent } from '../new-note-dialog/new-note-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Observable<Note[]>;

  constructor(private noteService: NoteService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.noteService.loadNotes();
    this.notes = this.noteService.activeNotes;
  }

  openNewNoteDialog() {
    const note = new Note();
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: '600px',
      data: { note: note}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.noteService.addNote(result);
        this.notes = this.noteService.activeNotes;
      }
    });
  }

  edit(note: Note) {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: '600px',
      data: { note: note }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.noteService.updateNote(result);
        this.notes = this.noteService.activeNotes;
      }
    });
  }

  delete(note: Note) {
    this.noteService.deleteNote(note);
    this.notes = this.noteService.activeNotes;
  }
}
