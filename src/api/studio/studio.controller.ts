
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudioService } from './studio.service';
import { JwtAuthGuard } from 'src/auth-guard/jwt/jwt.auth-guard';
import { Studio as StudioModel } from '@prisma/client';
import { StudioCreateBody } from 'src/dto/studio-create.body';
import { StudioImageCreateBody } from 'src/dto/studio-image-create';
import { StudioUpdateBody } from 'src/dto/studio-update';

@UseGuards(JwtAuthGuard)
@Controller('studio')

export class StudioController {
  constructor(private readonly studioService: StudioService) { }

  @Post(':centerId')
  studioCreate(@Param('centerId') centerId: number, @Body() body: StudioCreateBody) {
    return this.studioService.studioCreate(centerId, body);
  }

  @Post(':studioId/image')
  studioImageCreate(@Param('studioId') studioId: number, @Body() body: StudioImageCreateBody) {
    return this.studioService.studioImageCreate(+studioId, body);
  }

  @Patch(':studioId')
  studioUpdate(@Param('studioId') studioId: number, @Body() body: StudioUpdateBody){
    return this.studioService.studioUpdate(+studioId, body);
  }

  @Patch(':studioId/image')
  studioImageUpdate(@Param('studioId') studioId: number, @Body() body: StudioImageCreateBody){
    return this.studioService.studioImageUpdate(+studioId, body);
  }

  @Delete(':studioId')
  studioDelete(@Param('studioId') studioId: number) {
    return this.studioService.studioDelete(+studioId);
  }

  @Delete('image/:imageId')
  studioImageDelete(@Param('imageId') imageId: number) {
    return this.studioService.studioImageDelete(+imageId);
  }

  @Get(':centerId')
  studioFindAll(@Param('centerId') centerId: number) {
    return this.studioService.studioFindAll(+centerId);
  }

  @Get(':studioId')
  studioFindOne(@Param('studioId') studioId: string) {
    return this.studioService.studioFindOne(+studioId);
  }

}