import { Module } from '@nestjs/common';
import { CenterService } from './center.service';
import { CenterController } from './center.controller';
import { PrismaModule } from '../../services/prisma/prisma.module';
import { AuthorizationModule } from '../../services/authorization/authorization.module';
import { S3Module } from 'src/services/s3/s3.module';
import { KlidSearchAddressModule } from 'src/services/klid-search-address/klid-search-address.module';

@Module({
  controllers: [CenterController],
  providers: [CenterService],
  imports: [
    PrismaModule,
    AuthorizationModule,
    KlidSearchAddressModule,
    S3Module
  ],
})
export class CenterModule {}
