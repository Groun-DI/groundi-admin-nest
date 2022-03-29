import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBreakTimeDto } from './dto/create.controller.dto';
import { StudioBreaktimeService } from './studio-breaktime.service';

@Controller('studio-breaktime')
export class StudioBreaktimeController {
    constructor(private readonly studioBreakTimeService: StudioBreaktimeService) { }

    @Post()
    create(@Body() createBreakTimeDto: CreateBreakTimeDto) {
        return this.studioBreakTimeService.create(createBreakTimeDto);
    }

    @Get(':studioId')
    findAll(@Param('studioId') studioId: number) {
        return this.studioBreakTimeService.findAll(studioId);
    }
}
