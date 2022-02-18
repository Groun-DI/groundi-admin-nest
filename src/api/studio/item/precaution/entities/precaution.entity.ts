import { IsString } from "class-validator";

export class Precaution {
    @IsString()
    name: string;

    @IsString()
    content: string;
}
