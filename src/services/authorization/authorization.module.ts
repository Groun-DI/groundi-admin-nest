import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { AuthorizationService } from './authorization.service';
import { JwtStrategy } from '../../auth-guard/jwt/jwt.strategy';
import { JwtRefreshStrategy } from '../../auth-guard/jwt-refresh/jwt-refresh.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, JwtModule.register({}), ConfigModule],
  providers: [AuthorizationService, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
