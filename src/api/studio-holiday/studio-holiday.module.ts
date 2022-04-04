import { Module } from '@nestjs/common';
import { StudioHolidayService } from './studio-holiday.service';
import { StudioHolidayController } from './studio-holiday.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [StudioHolidayController],
  providers: [StudioHolidayService],
  imports: [PrismaModule]
})

export class StudioHolidayModule { }