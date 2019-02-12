import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note';
import { StatusService } from './status.service';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status';
import { HttpClient } from '@angular/common/http';
import { Logger } from 'projects/logger/src/lib/logger';
import { LoggerFactoryService } from 'projects/logger/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _activeNotes: BehaviorSubject<Note[]>;
  private API_URL: string;
  private _logger: Logger;

  private dataStore: {
    notes: Note[];
    statusById: Map<number, Status>;
    statuses: Status[];
  };

  constructor(private http: HttpClient,
              private statusService: StatusService,
              private loggerFactory: LoggerFactoryService) {
    this.dataStore = {
      notes: [],
      statuses: [],
      statusById: new Map<number, Status>()
    };
    this._activeNotes = new BehaviorSubject<Note[]>([]);
    this.API_URL = environment.api_url;
    this._logger = this.loggerFactory.createLogger('NoteService');
  }

  get activeNotes(): Observable<Note[]> {
    return this._activeNotes.asObservable();
  }

  loadNotes() {
    this.statusService.getStatuses('note').subscribe(statusData => {
      this.dataStore.statuses = statusData;
      this.dataStore.statusById = new Map<number, Status>(statusData.map(status => [status.id, status] as [number, Status]));
      this.http.get<Note[]>(`${this.API_URL}/api/v1/notes`).subscribe(noteData => {
        this.dataStore.notes = noteData;
        this._activeNotes.next(Object.assign({}, this.dataStore).notes
           .filter((item) => this.dataStore.statusById.get(item.statusId).code !== 'deleted'));
      },
      err => console.log(err));
    },
    err => console.log(err));
  }

  addNote(note: Note) {
    const activeId = this.dataStore.statuses.find(item => item.code === 'active').id;
    note.statusId = activeId;
    this.http.post<Note>(`${this.API_URL}/api/v1/notes`, note).subscribe(data => {
      this.dataStore.notes.push(data);
      this._activeNotes.next(Object.assign({}, this.dataStore).notes
      .filter((item) => this.dataStore.statusById.get(item.statusId).code !== 'deleted'));
    });
  }

  updateNote(note: Note) {
    this.http.put<Note>(`${this.API_URL}/api/v1/notes/${note.id}`, note).subscribe(data => {
      const index = this.dataStore.notes.findIndex((item) => item.id === note.id);
      if (index >= 0) {
        this.dataStore.notes[index] = data;
      }
      this._activeNotes.next(Object.assign({}, this.dataStore).notes
      .filter((item) => this.dataStore.statusById.get(item.statusId).code !== 'deleted'));
    });
  }

  deleteNote(note: Note) {
    this._logger.debug(this.dataStore.statuses);
    const deletedId = this.dataStore.statuses.find(item => item.code === 'deleted').id;
    note.statusId = deletedId;
    this.http.put<Note>(`${this.API_URL}/api/v1/notes/${note.id}`, note).subscribe(data => {
      const index = this.dataStore.notes.findIndex((item) => item.id === note.id);
      if (index >= 0) {
        this.dataStore.notes[index] = data;
      }
      this._activeNotes.next(Object.assign({}, this.dataStore).notes
      .filter((item) => this.dataStore.statusById.get(item.statusId).code !== 'deleted'));
    });
  }
}
