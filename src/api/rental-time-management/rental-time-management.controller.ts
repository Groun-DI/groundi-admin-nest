import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalPriceCreateBody } from 'src/dto/rental-price-create.body';
import { DailyStatusCreateBody } from 'src/dto/daily-status-create.body';
import { DailyStatusUpdateBody } from 'src/dto/daily-status-update.body';
import { HolidayCreateBody } from 'src/dto/holiday-create-body';
import { HolidayDeleteBody } from 'src/dto/holiday-delete.body';
import { HolidayUpdateBody } from 'src/dto/holiday-update.body';
import { RentalTimeManagementService } from './rental-time-management.service';

@Controller('rental-time-management/:studioId')
export class RentalTimeManagementController {
  constructor(private readonly rentalTimeManagementService: RentalTimeManagementService) { }

  @Post('holiday')
  holidayCreate(@Param('studioId') studioId: number, @Body() body: HolidayCreateBody) {
    return this.rentalTimeManagementService.holidayCreate(studioId, body);
  }

  @Post('daily-status')
  dailyStautsCreate(@Param('studioId') studioId: number, @Body() body: DailyStatusCreateBody) {
    return this.rentalTimeManagementService.dailyStautsCreate(studioId, body);
  }

  @Post('daily-rental-price')
  dailyRentalPriceCreate(@Param('studioId') studioId: number, @Body() body: RentalPriceCreateBody) {
    return this.rentalTimeManagementService.dailyRentalPriceCreate(body);
  }

  @Patch('holiday/:holidayId')
  holidayUpdate(@Param('holidayId') holidayId: number, @Body() body: HolidayUpdateBody) {
    return this.rentalTimeManagementService.holidayUpdate(holidayId, body);
  }

  @Patch('daily-status/:dailyStatusId')
  dailyStautsUpdate(@Param('dailyStatusId') dailyStatusId: number, @Body() body: DailyStatusUpdateBody,) {
    return this.rentalTimeManagementService.dailyStautsUpdate(dailyStatusId, body);
  }

  @Delete('holiday/:holidayId')
  holidayDelete(@Param('holidayId') holidayId: number, @Body() body: HolidayDeleteBody) {
    return this.rentalTimeManagementService.holidayDelete(holidayId, body);
  }

  @Delete('daily-rental-price/:dailyStatusId')
  dailyRentalPriceDelete(@Param('dailyStatusId') dailyStatusId: number) {
    return this.rentalTimeManagementService.dailyRentalPriceDelete(dailyStatusId);
  }

  @Get('holiday')
  holidayFindAll(@Param('studioId') studioId: number) {
    return this.rentalTimeManagementService.holidayFindAll(+studioId);
  }

  @Get('holiday/:holidayId')
  holidayFindOne(@Param('holidayId') holidayId: number) {
    return this.rentalTimeManagementService.holidayFindOne(holidayId);
  }

  @Get('daily-status')
  dailyStatusFindAll(@Param('id') id: string) {
    return this.rentalTimeManagementService.dailyStatusFindAll();
  }

  @Get('daily-status/:dailyStatusId')
  dailyStatusFindOne(@Param('dailyStatusId') dailyStatusId: number) {
    return this.rentalTimeManagementService.dailyStatusFindOne(dailyStatusId);
  }

  @Get('daily-rental-price')
  dailyRentalPriceFindAll(@Param('id') id: string) {
    return this.rentalTimeManagementService.dailyRentalPriceFindAll();
  }

  @Get('daily-rental-price/:dailyId')
  dailyRentalTimePriceFindOne(@Param('id') id: string) {
    return this.rentalTimeManagementService.dailyRentalPriceFindOne();
  }

}
