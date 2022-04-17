import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalTimeManagementService } from './rental-time-management.service';

@Controller('rental-time-management/:studioId')
export class RentalTimeManagementController {
  constructor(private readonly rentalTimeManagementService: RentalTimeManagementService) { }

  @Post('/holiday')
  holidayCreate() {
    return this.rentalTimeManagementService.holidayCreate();
  }

  @Post('/daily-status')
  dailyStautsCreate() {
    return this.rentalTimeManagementService.dailyStautsCreate();
  }

  @Post('/daily-rental-time-price')
  dailyRentalTimePriceCreate() {
    return this.rentalTimeManagementService.dailyRentalTimePriceCreate();
  }

  @Patch('/holiday/:holiday')
  holidayUpdate() {
    return this.rentalTimeManagementService.holidayUpdate();
  }

  @Patch('/daily-status/:dailyStatusId')
  dailyStautsUpdate() {
    return this.rentalTimeManagementService.dailyStautsUpdate();
  }

  @Delete('/holiday/:holiday')
  holidayDelete() {
    return this.rentalTimeManagementService.holidayDelete();
  }

  @Delete('/daily-rental-time-price/:dailyId')
  dailyRentalTimePriceDelete() {
    return this.rentalTimeManagementService.dailyRentalTimePriceDelete();
  }

  @Get('holiday')
  holidayFindAll() {
    return this.rentalTimeManagementService.holidayFindAll();
  }

  @Get('holiday/:holidayId')
  holidayFindOne(@Param('id') id: string) {
    return this.rentalTimeManagementService.holidayFindOne();
  }

  @Get('daily-status')
  dailyStatusFindAll(@Param('id') id: string ){
    return this.rentalTimeManagementService.dailyStatusFindAll();
  }

  @Get('daily-status/:dailyId')
  dailyStatusFindOne(@Param('id') id: string) {
    return this.rentalTimeManagementService.dailyStatusFindOne();
  }

  @Get('daily-rental-time-price')
  dailyRentalTimePriceFindAll(@Param('id') id: string) {
    return this.rentalTimeManagementService.dailyRentalTimePriceFindAll();
  }

  @Get('daily-rental-time-price/:dailyId')
  dailyRentalTimePriceFindOne(@Param('id') id: string) {
    return this.rentalTimeManagementService.dailyRentalTimePriceFindOne();
  }

}
