import { Module } from '@nestjs/common';
import { ComplimentaryService } from './complimentary.service';
import { ComplimentaryController } from './complimentary.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [ComplimentaryController],
  providers: [ComplimentaryService],
  imports: [PrismaModule]
})
export class ComplimentaryModule { }
