import { PartialType } from '@nestjs/mapped-types';
import { CreateStudioDailyRentalTimePriceDto } from './create-studio-daily-rental-time-price.dto';

export class UpdateStudioDailyRentalTimePriceDto extends PartialType(CreateStudioDailyRentalTimePriceDto) {}
