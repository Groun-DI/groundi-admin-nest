import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class DailyStatusCreateBody {
    @IsNotEmpty()
    @IsString()
    readonly dayOfweek: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly isOpen: boolean;
}
