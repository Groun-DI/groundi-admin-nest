import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBreakTimeDto {
    @IsNotEmpty()
    @IsNumber()
    readonly studioId: number

    @IsNotEmpty()
    @IsString()
    readonly week: string

    @IsNotEmpty()
    @IsString()
    readonly startTime: string

    @IsNotEmpty()
    @IsString()
    readonly endTime: string
}
