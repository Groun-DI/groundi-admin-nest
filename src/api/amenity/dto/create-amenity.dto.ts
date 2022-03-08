import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAmenityDto {
    @IsNotEmpty()
    @IsNumber()
    readonly studioId: number

    @IsNotEmpty()
    @IsString()
    readonly name: string
}
