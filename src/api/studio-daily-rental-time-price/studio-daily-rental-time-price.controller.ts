import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudioDailyRentalTimePriceService } from './studio-daily-rental-time-price.service';
import { CreateStudioDailyRentalTimePriceDto } from './dto/create-studio-daily-rental-time-price.dto';
import { UpdateStudioDailyRentalTimePriceDto } from './dto/update-studio-daily-rental-time-price.dto';

@Controller('studio-daily-rental-time-price')
export class StudioDailyRentalTimePriceController {
  constructor(private readonly studioDailyRentalTimePriceService: StudioDailyRentalTimePriceService) { }

  @Post()
  create(@Body() createStudioDailyRentalTimePriceDto: CreateStudioDailyRentalTimePriceDto) {
    return this.studioDailyRentalTimePriceService.create(createStudioDailyRentalTimePriceDto);
  }

  @Get()
  findAll() {
    return this.studioDailyRentalTimePriceService.findAll();
  }

  @Get(':dayOfweek')
  findOne(@Param('dayOfweek') dayOfweek: string) {
    return this.studioDailyRentalTimePriceService.findOne(dayOfweek);
  }

  @Delete(':weekId')
  remove(@Param('weekId') weekId: string) {
    return this.studioDailyRentalTimePriceService.remove(+weekId);
  }
}
