import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto, CreateCenterParkingLotDto } from '../../dto/center-create.body';
import { UpdateCenterDto } from '../../dto/center-update.body';
import { JwtAuthGuard, JwtModel } from 'src/auth-guard/jwt/jwt.auth-guard';
import { User } from '../../decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('/center')
export class CenterController {
  constructor(private readonly centerService: CenterService) { }

  @Post()
  centerCreate(@User() user: JwtModel, @Body() createCenterDto: CreateCenterDto) {
    return this.centerService.centerCreate(+user.id, createCenterDto);
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
  centerUpdate(@Param('centerId') centerId: number, @Body() updateCenterDto: UpdateCenterDto) {
    return this.centerService.centerUpdate(+centerId, updateCenterDto);
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
