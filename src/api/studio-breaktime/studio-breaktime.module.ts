import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { StudioBreaktimeController } from './studio-breaktime.controller';
import { StudioBreaktimeService } from './studio-breaktime.service';

@Module({
  providers: [StudioBreaktimeService],
  controllers: [StudioBreaktimeController],
  imports: [PrismaModule]
})
export class StudioBreaktimeModule {}
