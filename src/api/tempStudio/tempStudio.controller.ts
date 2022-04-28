
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TempStudioService } from './tempStudio.service';
import { CreateTempStudioDto } from './dto/create-temp-studio.dto';
import { UpdateTempStudioDto } from './dto/update-temp-studio.dto';
import { JwtAuthGuard } from 'src/auth-guard/jwt/jwt.auth-guard';
import { Studios as StudiosModel } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('temp-studio')

export class TempStudioController {
  constructor(private readonly tempStudioService: TempStudioService) { }

  @Post('/create')
  create(@Body() createPrecautionDto: CreateTempStudioDto) {
    return this.tempStudioService.create(createPrecautionDto);
  }

  @Get(':centerId')
  findAll(@Param('centerId') centerId: number):Promise<StudiosModel[]> {
    return this.tempStudioService.findAll(centerId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.studioService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrecautionDto: UpdateTempStudioDto) {
    return this.tempStudioService.update(+id, updatePrecautionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tempStudioService.remove(+id);
  }
}