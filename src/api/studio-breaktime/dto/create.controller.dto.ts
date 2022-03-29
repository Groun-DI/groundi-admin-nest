import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBreakTimeDto {
    @IsNotEmpty()
    @IsNumber()
    readonly studioId: number

    @IsNotEmpty()
    @IsString()
    readonly date: string

    @IsNotEmpty()
    @IsString()
    readonly time: string

    @IsNotEmpty()
    @IsString()
    readonly reason: string
}
