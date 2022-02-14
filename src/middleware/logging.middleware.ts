import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { JwtModel } from '../auth-guard/jwt/jwt.auth-guard';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const before = Date.now();
    const ip = req.ip ?? '-';
    const userAgent = req.get('user-agent') || '-';

    res.on('finish', () => {
      const now = new Date();
      const { statusCode } = res;
      const { method, url } = res.req;
      const user = (res.req.user as JwtModel)?.id || '-';
      const isoString = now.toISOString();

      this.logger.log(
        `${isoString} ${ip} ${userAgent} ${method} ${url} ${statusCode} ${user} ${
          now.getTime() - before
        }ms`,
      );
    });

    next();
  }
}
