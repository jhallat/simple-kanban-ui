export interface Appender {
  logMessage(type: string, loggerName: string, message: any);
}
