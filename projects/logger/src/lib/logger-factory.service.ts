import { Injectable } from '@angular/core';
import { Logger } from './logger';
import { ConsoleAppender } from './appenders/console-appender';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerFactoryService {

  constructor() { }



  createLogger(loggerName: string): Logger {
    // TODO define appenders externally, but use console appender for now
    if (environment.logging) {
      
    }

    const appenders = [new ConsoleAppender()];
    // TODO define levels externally, but use DEBUG for now
    const level = 'DEBUG';
    return new Logger(loggerName, level, appenders);
  }
}
