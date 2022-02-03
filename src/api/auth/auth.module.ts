import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NaverSmsModule } from '../../services/naver-sms/naver-sms.module';
import { PrismaModule } from '../../services/prisma/prisma.module';
import { RedisCacheModule } from '../../services/cache/cache.module';
import { AuthorizationModule } from '../../services/authorization/authorization.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    NaverSmsModule,
    PrismaModule,
    RedisCacheModule,
    AuthorizationModule,
  ],
})
export class AuthModule {}
