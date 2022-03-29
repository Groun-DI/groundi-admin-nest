
import { PartialType } from '@nestjs/mapped-types';
import { CreateBreakTimeDto } from './create.controller.dto';

export class UpdateRentalTimeDto extends PartialType(CreateBreakTimeDto) {}