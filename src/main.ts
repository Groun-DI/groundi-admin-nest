import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  BadRequestExceptionFilter,
  DefaultExceptionFilter,
  InternalExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter,
} from './errors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const host = config.get<string>('SERVER_HOST');
  const port = config.get<number>('SERVER_PORT');

  //bigint serialisation
  (BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }

  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    .useGlobalFilters(new DefaultExceptionFilter())
    .useGlobalFilters(new InternalExceptionFilter())
    .useGlobalFilters(new UnauthorizedExceptionFilter())
    .useGlobalFilters(new BadRequestExceptionFilter())
    .useGlobalFilters(new NotFoundExceptionFilter())
    .enableCors();
  app.setGlobalPrefix('/api');

  await app.listen(port, host);
}


bootstrap().then(() => console.log('RUNNING SERVER...'));
