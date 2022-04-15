import { Module } from '@nestjs/common';
import { StudioOpenStatusPerWeekService } from './studio-open-status-per-week.service';
import { StudioOpenStatusPerWeekController } from './studio-open-status-per-week.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [StudioOpenStatusPerWeekController],
  providers: [StudioOpenStatusPerWeekService],
  imports: [PrismaModule]
})
export class StudioOpenStatusPerWeekModule { }
