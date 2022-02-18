import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrecautionService } from './precaution.service';
import { CreatePrecautionDto } from './dto/create-precaution.dto';
import { UpdatePrecautionDto } from './dto/update-precaution.dto';
import { JwtAuthGuard } from 'src/auth-guard/jwt/jwt.auth-guard';

@UseGuards(JwtAuthGuard)
@Controller('precaution')
export class PrecautionController {
  constructor(private readonly precautionService: PrecautionService) {}

  @Post()
  create(@Body() createPrecautionDto: CreatePrecautionDto) {
    return this.precautionService.create(createPrecautionDto);
  }

  @Get()
  findAll() {
    return this.precautionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.precautionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrecautionDto: UpdatePrecautionDto) {
    return this.precautionService.update(+id, updatePrecautionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.precautionService.remove(+id);
  }
}
