import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudioOpenStatusPerWeekService } from './studio-open-status-per-week.service';
import { CreateStudioOpenStatusPerWeekDto } from './dto/create-studio-open-status-per-week.dto';
import { UpdateStudioOpenStatusPerWeekDto } from './dto/update-studio-open-status-per-week.dto';

@Controller('studio-open-status-per-week')
export class StudioOpenStatusPerWeekController {
  constructor(private readonly studioOpenStatusPerWeekService: StudioOpenStatusPerWeekService) {}

  @Post()
  create(@Body() createStudioOpenStatusPerWeekDto: CreateStudioOpenStatusPerWeekDto) {
    
    return this.studioOpenStatusPerWeekService.create(createStudioOpenStatusPerWeekDto);
  }

  @Get()
  findAll() {
    return this.studioOpenStatusPerWeekService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studioOpenStatusPerWeekService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudioOpenStatusPerWeekDto: UpdateStudioOpenStatusPerWeekDto) {
    return this.studioOpenStatusPerWeekService.update(+id, updateStudioOpenStatusPerWeekDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studioOpenStatusPerWeekService.remove(+id);
  }
}
