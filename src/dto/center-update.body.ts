import { PartialType } from '@nestjs/mapped-types';
import { CreateCenterDto } from './center-create.body';

export class UpdateCenterDto extends PartialType(CreateCenterDto) {}
