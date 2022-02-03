import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { DefaultExceptionFilter } from './filter/default-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { UserModule } from './api/user/user.module';
import { UserController } from './api/user/user.controller';
import { AuthController } from './api/auth/auth.controller';

console.log(process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: DefaultExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes(
        AppController,
        AuthController,
        UserController
      );
  }
}
