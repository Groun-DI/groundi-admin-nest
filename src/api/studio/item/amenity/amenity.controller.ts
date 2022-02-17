import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth-guard/jwt/jwt.auth-guard';
import { AmenityService } from './amenity.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';

@UseGuards(JwtAuthGuard)
@Controller('amenity')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Post()
  create(@Body() createAmenityDto: CreateAmenityDto) {
    return this.amenityService.create(createAmenityDto);
  }

  @Get()
  findAll() {
    return this.amenityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amenityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmenityDto: UpdateAmenityDto) {
    return this.amenityService.update(+id, updateAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amenityService.remove(+id);
  }
}
