
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudioService } from './studio.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { JwtAuthGuard } from 'src/auth-guard/jwt/jwt.auth-guard';
import { Studio as StudioModel } from '@prisma/client';
@UseGuards(JwtAuthGuard)
@Controller('studio')
export class StudioController {
  constructor(private readonly studioService: StudioService) { }

  @Post('/create')
  create(@Body() createPrecautionDto: CreateStudioDto) {
    return this.studioService.create(createPrecautionDto);
  }

  @Get(':centerId')
  findAll(@Param('centerId') centerId: number):Promise<StudioModel[]> {
    return this.studioService.findAll(centerId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.studioService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrecautionDto: UpdateStudioDto) {
    return this.studioService.update(+id, updatePrecautionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studioService.remove(+id);
  }
}
