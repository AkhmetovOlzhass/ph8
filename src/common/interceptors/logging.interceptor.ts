import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl } = req;

    const now = Date.now();
    console.log(`➡️  ${method} ${originalUrl} — IN`);

    return next.handle().pipe(
      tap((data) => {
        const res = context.switchToHttp().getResponse();
        console.log(
          `⬅️  ${method} ${originalUrl} — OUT | status: ${res.statusCode} | time: ${
            Date.now() - now
          }ms`,
        );
        console.log('Response body:', data);
      }),
    );
  }
}
