import { IsString } from "class-validator";

export class Complimentary {
    @IsString()
    name: string;

    @IsString()
    image: string;
}
