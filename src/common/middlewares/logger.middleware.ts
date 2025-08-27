import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('--- INCOMING REQUEST ---');
    console.log('Headers:', req.headers.authorization);
    console.log('Body:', req.body);
    console.log('-------------------------');
    next();
  }
}
