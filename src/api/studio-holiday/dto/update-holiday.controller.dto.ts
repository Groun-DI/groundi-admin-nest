import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateHolidayDto } from './create-holiday.controller.dto';

export class UpdateHolidayDto extends PartialType(CreateHolidayDto) {}