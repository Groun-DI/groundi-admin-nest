import { IsString } from "class-validator";

export class Amenity {
    @IsString()
    name: string;

    @IsString()
    image: string;
}
