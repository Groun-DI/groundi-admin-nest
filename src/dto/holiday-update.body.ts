import { IsNotEmpty, IsString } from 'class-validator';

export class HolidayUpdateBody {
    @IsString()
    readonly reason: string;
}
