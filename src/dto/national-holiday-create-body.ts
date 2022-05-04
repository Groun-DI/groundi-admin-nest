import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class NationalHolidayCreateBody {
    @IsNotEmpty()
    @IsString()
    readonly nationalHolidayId: string;
}
