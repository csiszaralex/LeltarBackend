import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = new Logger('LOG');
    const start = Date.now();
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url } = request;
    const body = this.sanitizeObject(request.body);
    const params = request.params;

    return next.handle().pipe(
      tap(() => {
        if (body && 'password' in body) body.password = '***';
        const duration = Date.now() - start;

        logger.verbose(
          `${method};${url};${duration}ms;${this.str(body)};${this.str(params)};${response.statusCode}`,
        );
      }),
      catchError((err: HttpException) => {
        if (body && 'password' in body) body.password = '***';
        const duration = Date.now() - start;

        logger.verbose(
          `${method};${url};${duration}ms;${this.str(body)};${this.str(params)};${err.getStatus()}`,
        );

        return throwError(() => err);
      }),
    );
  }

  private sanitizeObject(data: unknown): Record<string, unknown> | null {
    return typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : null;
  }

  private str(data: any): string {
    if (data === null || data === undefined) return '';
    return JSON.stringify(data);
  }
}
