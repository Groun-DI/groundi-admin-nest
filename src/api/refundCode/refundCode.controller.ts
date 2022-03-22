
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RefundCodeService } from './refundCode.service';
import { RefundCode as RefundCodeModel } from '@prisma/client';

@Controller('refundCode')
export class RefundCodeController {
  constructor(private readonly refundCodeService: RefundCodeService) { }

  @Get()
  findAll(): Promise<RefundCodeModel[]> {
    return this.refundCodeService.findAll();
  }
}
