import { Injectable } from '@angular/core';
import { Logger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerFactoryService {

  constructor() { }

  createLogger(loggerName: string): Logger {
    // TODO define appenders externally

  }
}
