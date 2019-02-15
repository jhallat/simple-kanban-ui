import { Injectable } from '@angular/core';
import { Logger } from './logger';
import { ConsoleAppender } from './appenders/console-appender';
import { environment } from 'src/environments/environment';
import { Appender } from './appenders/appender';

@Injectable({
  providedIn: 'root'
})
export class LoggerFactoryService {

  appenders:Appender[] = [];
  constructor() {
    if (environment.logging) {
      const logging = environment.logging;
      if (logging.appenders) {
        for (let appender of logging.appenders) {
          if (appender.toLowerCase() === 'console') {
            this.appenders.push(new ConsoleAppender());
          }
        }
      }
      if (logging.loggers) {
        console.log('length ' + logging.loggers.length);
        for (let logger of logging.loggers) {
          console.log(logger);
        }
      }
    }
   }



  createLogger(loggerName: string): Logger {
    // TODO define levels externally, but use DEBUG for now
    const level = 'DEBUG';
    return new Logger(loggerName, level, this.appenders);
  }
}
