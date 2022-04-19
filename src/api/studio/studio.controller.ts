
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudioService } from './studio.service';
import { JwtAuthGuard } from 'src/auth-guard/jwt/jwt.auth-guard';
import { Studio as StudioModel } from '@prisma/client';
import { StudioCreateBody } from 'src/dto/studio-create.body';
import { StudioImageCreateBody } from 'src/dto/studio-image-create';
import { StudioUpdateBody } from 'src/dto/studio-update';
import { AmenityUpdateBody } from 'src/dto/amenity-update.body';
import { ComplimentaryUpdateBody } from 'src/dto/complimentary-update';
import { PrecautionUpdateBody } from 'src/dto/precaution-update.body';


@Controller('studio')

export class StudioController {
  constructor(private readonly studioService: StudioService) { }

  @Post(':centerId')
  studioCreate(@Param('centerId') centerId: number, @Body() body: StudioCreateBody) {
    return this.studioService.studioCreate(centerId, body);
  }

  // @Post(':studioId/image')
  // studioImageCreate(@Param('studioId') studioId: number, @Body() body: StudioImageCreateBody) {
  //   return this.studioService.studioImageCreate(+studioId, body);
  // }

  @Patch(':studioId')
  studioUpdate(@Param('studioId') studioId: number, @Body() body: StudioUpdateBody) {
    return this.studioService.studioUpdate(+studioId, body);
  }

  @Patch(':studioId/amenity')
  amenityUpdate(@Param('studioId') studioId: number, @Body() body: AmenityUpdateBody[]) {
    return this.studioService.amenityUpdate(+studioId, body);
  }

  @Patch(':studioId/complimentary')
  complimentaryUpdate(@Param('studioId') studioId: number, @Body() body: ComplimentaryUpdateBody[]) {
    return this.studioService.complimentaryUpdate(+studioId, body);
  }

  @Patch(':studioId/precaution')
  precautionUpdate(@Param('studioId') studioId: number, @Body() body: PrecautionUpdateBody[]) {
    return this.studioService.precautionUpdate(+studioId, body);
  }

  // @Patch(':studioId/image')
  // studioImageUpdate(@Param('studioId') studioId: number, @Body() body: StudioImageCreateBody){
  //   return this.studioService.studioImageUpdate(+studioId, body);
  // }

  // @Delete(':studioId')
  // studioDelete(@Param('studioId') studioId: number) {
  //   return this.studioService.studioDelete(+studioId);
  // }

  @Delete('image/:imageId')
  studioImageDelete(@Param('imageId') imageId: number) {
    return this.studioService.studioImageDelete(+imageId);
  }

  // @Get(':centerId')
  // studioFindAll(@Param('centerId') centerId: number) {
  //   return this.studioService.studioFindAll(+centerId);
  // }

  @Get(':studioId')
  studioFindOne(@Param('studioId') studioId: string): Promise<StudioModel> {
    return this.studioService.studioFindOne(+studioId);
  }

}