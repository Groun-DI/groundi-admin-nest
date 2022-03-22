import { Module } from '@nestjs/common';
import { RefundCodeService } from './refundCode.service';
import { RefundCodeController } from './refundCode.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [RefundCodeController],
  providers: [RefundCodeService],
  imports: [PrismaModule]
})

export class RefundCodeModule { }
