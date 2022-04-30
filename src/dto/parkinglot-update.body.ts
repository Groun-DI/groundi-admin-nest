
import { PartialType } from '@nestjs/mapped-types';
import { CreateCenterParkingLotDto } from './parkinglot-create.body';

export class ParkingLotUpdateBody extends PartialType(CreateCenterParkingLotDto) { }
