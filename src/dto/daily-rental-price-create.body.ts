import { IsBoolean, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class DailyRentalPriceCreateBody {
    @IsNotEmpty()
    @IsNumber()
    readonly dailyStatusId: number;

    @IsNotEmpty()
    @IsString()
    readonly startAt: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
}
