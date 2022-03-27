import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth-guard/jwt/jwt.auth-guard';
import { CreateRentalTimeDto } from './dto/create-rentaltime.controller.dto';
import { UpdateRentalTimeDto } from './dto/update-rentaltime.controller.dto';
import { StudioRentaltimeService } from './studio-rentaltime.service';

@UseGuards(JwtAuthGuard)
@Controller('studio-rentaltime')
export class StudioRentaltimeController {
    constructor(private readonly studioRentaltimeService: StudioRentaltimeService) {}

  @Post()
  create(@Body() createComplimentaryDto: CreateRentalTimeDto) {
    return this.studioRentaltimeService.create(createComplimentaryDto);
  }

  @Get(':studioId')
  findOne(@Param('studioId') studioId: number) {
    return this.studioRentaltimeService.findOne(studioId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplimentaryDto: UpdateRentalTimeDto) {
    return this.studioRentaltimeService.update(+id, updateComplimentaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studioRentaltimeService.remove(+id);
  }
}
