import { IsNotEmpty, IsString } from "class-validator";

export class CreatePrecautionDto {
    @IsNotEmpty()
    @IsString()
    readonly content: string
}
