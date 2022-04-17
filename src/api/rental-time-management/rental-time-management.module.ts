import { Module } from '@nestjs/common';
import { RentalTimeManagementService } from './rental-time-management.service';
import { RentalTimeManagementController } from './rental-time-management.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [RentalTimeManagementController],
  providers: [RentalTimeManagementService],
  imports: [PrismaModule]
})
export class RentalTimeManagementModule { }
