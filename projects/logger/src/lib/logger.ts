import { Appender } from './appenders/appender';

export class Logger {

  private _loggerName = '';
  private _logLevel = 0;
  private _appenders: Appender[];

  const(loggerName: string, logLevel: string, appenders: Appender[]) {
    this._loggerName = loggerName;
    this._appenders = appenders;
    switch (logLevel) {
      case 'ERROR': {
        this._logLevel = 1;
        break;
      }
      case 'WARN': {
        this._logLevel = 2;
        break;
      }
      case 'INFO': {
        this._logLevel = 3;
        break;
      }
      case 'DEBUG': {
        this._logLevel = 4;
        break;
      }
      default: {
        this._logLevel = 0;
        break;
      }
    }
  }

  error(message: string) {
    if (this._logLevel > 0 && this._appenders) {
      for (let appender of this._appenders) {
        appender.logMessage("ERROR", message);
      }
    }
  }

}
