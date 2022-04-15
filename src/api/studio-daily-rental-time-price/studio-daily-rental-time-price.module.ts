import { Module } from '@nestjs/common';
import { StudioDailyRentalTimePriceService } from './studio-daily-rental-time-price.service';
import { StudioDailyRentalTimePriceController } from './studio-daily-rental-time-price.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [StudioDailyRentalTimePriceController],
  providers: [StudioDailyRentalTimePriceService],
  imports: [PrismaModule]
})
export class StudioDailyRentalTimePriceModule { }
