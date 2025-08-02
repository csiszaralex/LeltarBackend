import { LogLevel } from '@nestjs/common';

export interface AppConfig {
  port: number;
  Loglevel: LogLevel[];
  DATABASE_URL: string;
}
