import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  @Output() delete = new EventEmitter<Note>();
  constructor() { }

  ngOnInit() {
  }

  deleteNote() {
    this.delete.emit(this.note);
  }

}
