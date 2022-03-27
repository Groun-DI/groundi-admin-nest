import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalTimeDto } from './create-rentaltime.controller.dto';

export class UpdateRentalTimeDto extends PartialType(CreateRentalTimeDto) {}