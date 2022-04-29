import { UseGuards, Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto, CreateCenterParkingLotDto } from '../../dto/center-create.body';
import { UpdateCenterDto } from '../../dto/center-update.body';
import { JwtAuthGuard, JwtModel } from 'src/auth-guard/jwt/jwt.auth-guard';
import { User } from '../../decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('/center')
export class CenterController {
  constructor(private readonly centerService: CenterService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  centerCreate(@User() user: JwtModel, @UploadedFile() busniessLicenseFile: Express.Multer.File, @Body() createCenterDto: CreateCenterDto) {
    return this.centerService.centerCreate(+user.id, busniessLicenseFile, createCenterDto);
  }

  @Post(':centerId/file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: string) {
    console.log(file);
    console.log(body);
  }

  @Post(':centerId/parkinglot')
  parkingLotCreate(@Param('centerId') centerId: number, @Body() createCenterParkingDto: CreateCenterParkingLotDto) {
    return this.centerService.parkingLotCreate(+centerId, createCenterParkingDto);
  }

  @Get()
  centerFindAll(@User() user: JwtModel) {
    return this.centerService.centerFindAll(+user.id);
  }

  @Get(':centerId')
  centerFindOne(@Param('centerId') centerId: number) {
    return this.centerService.centerFindOne(+centerId);
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


  @Get('address/:address')
  getGeoCodingService(@Param('address') address: string) {
    return this.centerService.getGeoCodingService(address);
  }
}
