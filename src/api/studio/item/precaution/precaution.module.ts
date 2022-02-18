import { Module } from '@nestjs/common';
import { PrecautionService } from './precaution.service';
import { PrecautionController } from './precaution.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [PrecautionController],
  providers: [PrecautionService],
  imports: [PrismaModule]
})
export class PrecautionModule { }
