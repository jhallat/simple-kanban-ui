import { Injectable } from '@angular/core';
import { Logger } from './logger';
import { ConsoleAppender } from './appenders/console-appender';
import { environment } from 'src/environments/environment';
import { Appender } from './appenders/appender';

@Injectable({
  providedIn: 'root'
})
export class LoggerFactoryService {

  appenders: Appender[] = [];
  loggers: Map<string, string> = new Map<string, string>();

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
        for (let logger of logging.loggers) {
          this.loggers.set(logger.logger.name, logger.logger.level);
        }
      }
    }
   }



  createLogger(loggerName: string): Logger {
    // TODO define levels externally, but use DEBUG for now
    var level = 'NONE';
    if (this.loggers.has(loggerName)) {
      level = this.loggers.get(loggerName);
    } else {
      if (this.loggers.has('root')) {
        level = this.loggers.get('root');
      } else {
        console.log("Warning. No root logger has been defined.");
      }
    }
    return new Logger(loggerName, level, this.appenders);
  }
}
