import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth-guard/jwt/jwt.auth-guard';
import { ComplimentaryService } from './complimentary.service';
import { CreateComplimentaryDto } from './dto/create-complimentary.dto';
import { UpdateComplimentaryDto } from './dto/update-complimentary.dto';

@UseGuards(JwtAuthGuard)
@Controller('complimentary')
export class ComplimentaryController {
  constructor(private readonly complimentaryService: ComplimentaryService) {}

  @Post()
  create(@Body() createComplimentaryDto: CreateComplimentaryDto) {
    return this.complimentaryService.create(createComplimentaryDto);
  }

  @Get()
  findAll() {
    return this.complimentaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complimentaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplimentaryDto: UpdateComplimentaryDto) {
    return this.complimentaryService.update(+id, updateComplimentaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complimentaryService.remove(+id);
  }
}
