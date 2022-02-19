import { IsNotEmpty, IsString } from "class-validator";

export class CreateComplimentaryDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string
}
