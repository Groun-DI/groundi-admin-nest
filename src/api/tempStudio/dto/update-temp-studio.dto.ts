import { PartialType } from '@nestjs/mapped-types';
import { CreateTempStudioDto } from './create-temp-studio.dto';

export class UpdateTempStudioDto extends PartialType(CreateTempStudioDto) {}
