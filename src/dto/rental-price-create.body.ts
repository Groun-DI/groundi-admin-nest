import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class RentalPriceCreateBody {

    @IsNotEmpty()
    @IsString()
    readonly startAt: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsNumber()
    readonly dayOfweekId: number;
}
