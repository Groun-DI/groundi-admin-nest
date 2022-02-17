import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { AmenityController } from './amenity.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [AmenityController],
  providers: [AmenityService],
  imports: [PrismaModule]
})
export class AmenityModule { }
