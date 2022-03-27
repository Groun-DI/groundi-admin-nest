import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRentalTimeDto {
    @IsNotEmpty()
    @IsNumber()
    readonly studioId: number

    @IsNotEmpty()
    @IsString()
    readonly openHours: string

    @IsNotEmpty()
    @IsString()
    readonly closedHours: string

    @IsNotEmpty()
    @IsNumber()
    readonly minimumReantalTime: number

    @IsNotEmpty()
    @IsNumber()
    readonly rentalTimeUnit: number
}
