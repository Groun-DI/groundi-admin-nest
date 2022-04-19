import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class HolidayCreateBody {
    @IsNotEmpty()
    @IsString()
    readonly startDate: string;

    @IsNotEmpty()
    @IsString()
    readonly endDate: string;

    @IsString()
    readonly reason: string;
}
