import { PartialType } from '@nestjs/mapped-types';
import { CreatePrecautionDto } from './create-precaution.dto';

export class UpdatePrecautionDto extends PartialType(CreatePrecautionDto) {}
