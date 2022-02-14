import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { CenterController } from './center.controller';
import { PrismaModule } from '../../services/prisma/prisma.module';
import { AuthorizationModule } from '../../services/authorization/authorization.module';

@Module({
  controllers: [CenterController],
  providers: [CenterService],
  imports: [
    PrismaModule,
    AuthorizationModule,
  ],
})
export class CenterModule {}