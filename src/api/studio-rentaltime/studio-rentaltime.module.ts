import { Module } from '@nestjs/common';
import { StudioRentaltimeService } from './studio-rentaltime.service';
import { StudioRentaltimeController } from './studio-rentaltime.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [StudioRentaltimeController],
  providers: [StudioRentaltimeService],
  imports: [PrismaModule]
})

export class StudioRentaltimeModule { }