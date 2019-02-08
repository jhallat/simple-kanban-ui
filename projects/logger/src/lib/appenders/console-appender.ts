import { Appender } from './appender';

export class ConsoleAppender implements Appender {

  logMessage(type: string, message: string) {
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}
