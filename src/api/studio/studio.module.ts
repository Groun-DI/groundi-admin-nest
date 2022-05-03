import { Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { S3Module } from 'src/services/s3/s3.module';
@Module({
  controllers: [StudioController],
  providers: [StudioService],
  imports: [PrismaModule, S3Module]
})
export class StudioModule { }
