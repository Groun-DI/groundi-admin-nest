import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth-guard/jwt/jwt.auth-guard';
import { CreateHolidayDto } from './dto/create-holiday.controller.dto';
import { UpdateHolidayDto } from './dto/update-holiday.controller.dto';
import { StudioHolidayService } from './studio-holiday.service';

@UseGuards(JwtAuthGuard)
@Controller('studio-holiday')
export class StudioHolidayController {
    constructor(private readonly studioHolidayService: StudioHolidayService) {}

  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto) {
    return this.studioHolidayService.create(createHolidayDto);
  }

  @Get(':studioId/date/:datetime')
  findOne(@Param('studioId') studioId: number,  @Param('datetime') datetime: string) {
    return this.studioHolidayService.findOne(studioId, datetime);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateHolidayDto: UpdateHolidayDto) {
    return this.studioHolidayService.update(id, updateHolidayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studioHolidayService.remove(+id);
  }
}
