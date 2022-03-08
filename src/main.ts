import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const host = config.get<string>('SERVER_HOST');
  const port = config.get<number>('SERVER_PORT');
  setBigIntParser()
  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    .enableCors();
  app.setGlobalPrefix('/api');

  await app.listen(port, host);
}
  
function setBigIntParser() {
  (BigInt.prototype as any).toJSON = () => parseInt(this.toString());
}

bootstrap().then(() => console.log('RUNNING SERVER...'));
