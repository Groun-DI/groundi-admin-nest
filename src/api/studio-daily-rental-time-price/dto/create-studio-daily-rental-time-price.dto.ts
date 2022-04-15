import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudioDailyRentalTimePriceDto {
    @IsNotEmpty()
    @IsNumber()
    readonly weekId: number

    @IsNotEmpty()
    @IsString()
    readonly startAt: string

    @IsNotEmpty()
    @IsNumber()
    readonly price: number
}
