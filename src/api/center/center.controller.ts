import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { JwtAuthGuard, JwtModel } from 'src/auth-guard/jwt/jwt.auth-guard';
import { User } from '../../decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('/center')
export class CenterController {
  constructor(private readonly centerService: CenterService) { }

  @Post('/create')
  create(@User() user: JwtModel, @Body() createCenterDto: CreateCenterDto) {
    return this.centerService.create(user.id, createCenterDto);
  }

  @Get()
  findAll(@User() user: JwtModel) {
    return this.centerService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCenterDto: UpdateCenterDto) {
    return this.centerService.update(+id, updateCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centerService.remove(+id);
  }

  @Get('/:address')
  async 909(@Param('address') address: string): Promise<any> {
    return this.centerService.getGeoCodingService(address);
  }

}
