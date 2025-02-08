import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    this.logger.log(
      `${method} ${url}`,
      'Request'
    );

    return next
      .handle()
      .pipe(
        tap(() => {
          this.logger.log(
            `${method} ${url} ${Date.now() - now}ms`,
            'Response'
          );
        }),
      );
  }
} 