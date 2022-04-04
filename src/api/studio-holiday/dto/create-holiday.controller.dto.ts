import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHolidayDto {
    @IsNotEmpty()
    @IsNumber()
    readonly studioId: number

    @IsNotEmpty()
    @IsString()
    readonly date: string

    @IsNotEmpty()
    @IsString()
    readonly reason: string
}
