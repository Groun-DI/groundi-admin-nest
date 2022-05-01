import { UseGuards, Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, Patch, Query } from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto } from '../../dto/center-create.body';
import { UpdateCenterDto } from '../../dto/center-update.body';
import { JwtAuthGuard, JwtModel } from 'src/auth-guard/jwt/jwt.auth-guard';
import { User } from '../../decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParkingLotUpdateBody } from 'src/dto/parkinglot-update.body';
import { CreateCenterParkingLotDto } from 'src/dto/parkinglot-create.body';

@UseGuards(JwtAuthGuard)
@Controller('/centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) { }

  @Post()
  @UseInterceptors(FileInterceptor('busniessLicenseFile'))
  centerCreate(@User() user: JwtModel, @UploadedFile() busniessLicenseFile: Express.Multer.File, @Body() createCenterDto: CreateCenterDto) {
    return this.centerService.centerCreate(+user.id, busniessLicenseFile, createCenterDto);
  }

  @Post(':centerId/parkinglot')
  parkingLotCreate(@Param('centerId') centerId: number, @Body() createCenterParkingDto: CreateCenterParkingLotDto) {
    return this.centerService.parkingLotCreate(+centerId, createCenterParkingDto);
  }


  @Get()
  centerFindAll(@User() user: JwtModel) {
    return this.centerService.centerFindAll(+user.id);
  }

  @Get('addresses')
  getAddressesOfSearchResults(@Query('keyword') keyword: string) {
    return this.centerService.getAddressesOfSearchResults(keyword);
  }

  @Get(':centerId')
  centerFindOne(@Param('centerId') centerId: number) {
    return this.centerService.centerFindOne(+centerId);
  }

  @Patch(':centerId/parkinglot')
  parkinglotUpdate(@Param('centerId') centerId: number, @Body() parkingLotUpdateBody: ParkingLotUpdateBody) {
    return this.centerService.parkingLotUpdate(+centerId, parkingLotUpdateBody);
  }

  @Patch(':centerId')
  @UseInterceptors(FileInterceptor('busniessLicenseFile'))
  centerUpdate(@Param('centerId') centerId: number, @UploadedFile() busniessLicenseFile: Express.Multer.File, @Body() updateCenterDto: UpdateCenterDto) {
    return this.centerService.centerUpdate(+centerId, busniessLicenseFile, updateCenterDto);
  }

  @Delete(':centerId')
  delete(@Param('centerId') centerId: number) {
    return this.centerService.centerDelete(+centerId);
  }
}
