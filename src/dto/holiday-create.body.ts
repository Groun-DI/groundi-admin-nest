import { IsNotEmpty, IsString } from 'class-validator';

export class HolidayCreateBody {
    @IsNotEmpty()
    @IsString()
    readonly date: string;

    @IsString()
    readonly reason: string;
}
