import { PartialType } from '@nestjs/mapped-types';
import { CreateStudioDto } from './create-precaution.dto';

export class UpdateStudioDto extends PartialType(CreateStudioDto) {}
