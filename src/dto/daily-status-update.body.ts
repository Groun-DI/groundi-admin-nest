import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class DailyStatusUpdateBody {
    @IsNotEmpty()
    @IsBoolean()
    readonly isOpen: boolean;
}
