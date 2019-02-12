import { Appender } from './appender';
import { DatePipe } from '@angular/common';

export class ConsoleAppender implements Appender {

  logMessage(type: string, loggerName: string, message: any) {
    // TODO should use system locale
    const now = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd hh:mm:ss.s');
    let displayMessage: string;
    if (Object.prototype.toString.call(message) === '[object String]') {
      displayMessage = message;
    } else {
      displayMessage = JSON.stringify(message);
    }
    console.log(`[${type.toUpperCase()}] ${loggerName}: ${now} - ${displayMessage}`);
  }
}
