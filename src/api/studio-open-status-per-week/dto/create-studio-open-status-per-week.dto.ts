import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudioOpenStatusPerWeekDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: bigint

    @IsNotEmpty()
    @IsString()
    readonly dayOfweek: string

    @IsNotEmpty()
    @IsNumber()
    readonly studioId: bigint

    @IsNotEmpty()
    @IsBoolean()
    readonly isOpen: boolean
}
