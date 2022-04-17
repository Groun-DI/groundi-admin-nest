import { PartialType } from '@nestjs/mapped-types';
import { CreateStudioOpenStatusPerWeekDto } from './create-studio-open-status-per-week.dto';

export class UpdateStudioOpenStatusPerWeekDto extends PartialType(CreateStudioOpenStatusPerWeekDto) {}
