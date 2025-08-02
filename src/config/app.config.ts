import { LogLevel } from '@nestjs/common';
import { AppConfig } from './app.config.interface';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT || '3000', 10),
  Loglevel: getLogLevel(parseInt(process.env.LOG_LEVEL ?? '4')),
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/test',
});

enum LogLevels {
  off = 0,
  fatal = 1,
  error = 2,
  warn = 3,
  log = 4,
  verbose = 5,
  debug = 6,
}

function getLogLevel(level: number): LogLevel[] {
  const levels: LogLevel[] = [];
  if (level >= Number(LogLevels.fatal)) levels.push('fatal');
  if (level >= Number(LogLevels.error)) levels.push('error');
  if (level >= Number(LogLevels.warn)) levels.push('warn');
  if (level >= Number(LogLevels.log)) levels.push('log');
  if (level >= Number(LogLevels.verbose)) levels.push('verbose');
  if (level >= Number(LogLevels.debug)) levels.push('debug');
  return levels;
}
